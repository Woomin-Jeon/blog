---
title: "[React] 시작하기"
date: 2020-01-24
category: "All"
draft: true
---

리액트를 시작하기 위해 웹팩을 통한 초기설정을 해보자  
  
react, webpack, babel 설치

```javascript
$ npm init -y
$ npm i react react-dom
$ npm i -D webpack webpack-cli
$ npm i -D webpack-dev-server
$ npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

프로젝트 루트 디렉토리에 webpack.config.js 생성 및 작성

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

프로젝트 루트 디렉토리에 babel.config.js 생성 및 작성

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
};
```

프로젝트 루트 디렉토리에 index.html 생성 및 작성

```javascript
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="app"></div>
    <script src="main.js"></script>
  </body>
</html>
```

프로젝트 루트 디렉토리에 src 디렉토리 생성  
그리고 src 디렉토리 안에 index.js와 App.js 파일 생성  
  
index.js 파일 작성

```javascript
import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

ReactDom.render(<App />, document.getElementById('app'));
```

App.js 파일 작성

```javascript
import React, { useState, useEffect } from 'react';

const App = () => {
  return (
    <div></div>
  );
};

export default App;
```

이제 모든 설정이 완료되었다. package.json 파일로 가서 scripts에 "start": "webpack-dev-server" 을 작성한 후, 터미널에 "$ npm start"를 하면 webpack-dev-server에 정상적으로 출력되는 것을 볼 수 있다.
이제 App.js 파일에 React를 작성하자.
