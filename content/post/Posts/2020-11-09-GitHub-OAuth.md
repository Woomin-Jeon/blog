---
title: "[Auth] passport 없이 GitHub OAuth 구현하기"
date: 2020-11-09
tag: ["Posts"]
---

OAuth 인증 방식의 학습을 위해서 passport 라이브러리를 사용하지 않고 GitHub OAuth를 구현해보기로 하였습니다. 참고한 OAuth 흐름은 다음과 같습니다.
![toast OAuth image](https://image.toast.com/aaaadh/alpha/2017/techblog/1%201%281%29.png)  
  
사진에는 사용자, 서비스 Client, Authorization Server, Resource Server로 나누어져 있는데, 여기서 서비스 Client가 제가 제공하는 서비스의 서버이고, Server가 GitHub가 제공하는 OAuth 서버입니다. 처음 이해함에 있어서 헷갈렸던 점이 있어서 저는 이번 포스팅에서는 다음과 같이 부르도록 하겠습니다.

- `클라이언트 (사용자)` : 저희 서비스의 클라이언트(프론트엔드)를 사용하는 사용자입니다.
- `우리 서버 (Client)` : 저희 서비스의 서버입니다. (GitHub 서버의 관점에서는 클라이언트)
- `GitHub 서버 (Authorization and Resource Server)` : OAuth API를 제공하는 GitHub OAuth 서버입니다.

<br><br>

## 전체적인 흐름

전체적인 흐름은 다음과 같습니다.

1. 클라이언트가 GitHub 서버로부터 인증하고 `code` 받습니다.
2. 이 code를 우리 서버로 보내줍니다. (Request)
3. 우리 서버는 code를 받아서 GitHub 서버(Authorization Server)로부터 `access token`을 발급받습니다.
4. 이 access token을 사용하면 GitHub 서버(Resource Server)로부터 프로필과 같은 정보를 얻을 수 있습니다.
5. access token은 데이터베이스에 저장하고, Response로 클라이언트에 access token과 로그인한 유저 정보를 담아 보내줍니다.

<img src="../images/github-oauth.png" />

참고로 GitHub OAuth에 어플리케이션을 등록하고 client_id와 secret을 발급받아야합니다.

<br><br>

### 1. GitHub 서버로부터 인증하고 code 얻기

```jsx
import React from 'react';

export default function LoginPage() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const callbackURL = process.env.CLIENT_CALLBACK_URL;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackURL}`;
  // GITHUB_CLIENT_ID는 GitHub OAuth에 어플리케이션 등록 후 발급받은 ID입니다.
  // CLIENT_CALLBACK_URL은 어플리케이션 등록 시 설정한 URL이며,
  // 해당 URL에 code를 쿼리 스트링으로 GitHub 서버가 리다이렉트 시켜줍니다.

  return (
    <a href={url}>GitHub로 로그인하기</a>
    // 유저를 GitHub 인증 페이지로 이동시켜서 로그인하게 합니다.
    // 로그인이 성공하면 redirect_uri로 지정된 URL에 code가 쿼리스트링으로 붙은 채로 리다이렉트됩니다.
  );
}
```

### 2. code를 우리 서버로 전송하기

```jsx
import React from 'react';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

export default function CallbackPage() {
  const searchParams = new URLSearchParams(useLocation().search);
  const code = searchParams.get('code');
  // CallbackPage의 URL로부터 쿼리스트링을 읽고, code를 추출합니다.

  const getAccessToken = async (code) => {
    const { data } = await axios.post('http://127.0.0.1:3000/auth', { code });
    // 우리 서버로 code를 전송합니다.

    const { accessToken, userInfomation } = data; // 서버로부터 받게될 데이터 (5번 과정)
  };

  useEffect(() => {
    getAccessToken(query.get('code'));
  }, []);

  return <div />;
}
```

### 3. 우리 서버에서 code를 바탕으로 access token을 얻기

```js
const app = require('express')();

const axios = require('axios');

app.post('/auth', (req, res) => {
  const { code } = req.body;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const secret = process.env.GITHUB_SECRET;

  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL); // POST 요청으로 해야합니다.
  
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token'); // access token 획득
});
```

### 4. access token을 바탕으로 해당 유저의 GitHub 프로필 정보 얻어오기

```js
const app = require('express')();

const axios = require('axios');

app.post('/auth', (req, res) => {
  const { code } = req.body;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const secret = process.env.GITHUB_SECRET;

  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL); // POST 메서드 사용
  
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token'); // access token 획득

  /* --- 4번 과정 --- */

  const USER_PROFILE_URL = 'https://api.github.com/user';

  const { data: userInfomation } = await axios.get(USER_PROFILE_URL, { // GET 메서드 사용
    headers: {
      Authorization: `token ${accessToken}`, // Authorization 헤더 설정
    },
  });
});
```

### 5. access token DB에 저장 후, 클라이언트에 response 해주기

```js
const app = require('express')();

const axios = require('axios');

const DB = require('../database');

app.post('/auth', (req, res) => {
  const { code } = req.body;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const secret = process.env.GITHUB_SECRET;

  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL); // POST 메서드 사용
  
  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token'); // access token 획득

  /* --- 4번 과정 --- */

  const USER_PROFILE_URL = 'https://api.github.com/user';

  const { data: userInfomation } = await axios.get(USER_PROFILE_URL, { // GET 메서드 사용
    headers: {
      Authorization: `token ${accessToken}`, // Authorization 헤더 설정
    },
  });

  /* --- 5번 과정 --- */

  DB.add(accessToken); // 프로젝트가 원하는 방향으로 설정해주면 됩니다.
  res.status(200).send({ accessToken, userInformation });
});
```

<br><br>

## 정리

GitHub OAuth를 이용한 사용자 인증이 완료되었습니다. 이제 서버에서 미들웨어와 같은 방식을 사용해서 인가를 처리해주면 될 것 같습니다.  
passport를 사용하면 더 쉽게 구현할 수 있는 것 같은데, passport 없이도 찬찬히 따라가면서 해보니까 크게 어렵지는 않았고, OAuth의 동작 방식과 흐름을 이해할 수 있어 더 유익했던 것 같습니다.
