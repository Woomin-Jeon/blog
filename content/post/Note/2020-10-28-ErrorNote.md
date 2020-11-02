---
title: "Error Note"
date: 2020-11-02
tag: ["Note"]
---

## JavaScript

- **Fetch를 사용했고, 서버에 body-parser도 설정해두었는데도 서버에 body가 안들어가는 문제**
  Fetch의 헤더 설정 프로퍼티명을 잘못 기입해서 발생한 문제였습니다.

  ```js
  const response = await fetch(URL, {
    method: 'POST',
    header: { // header가 아니라 headers 입니다... 엉엉엉
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  ```

- **Fetch를 사용했고, 서버에 CORS 미들웨어도 설정해두었는데도 CORS 이슈가 발생하는 문제**
  Fetch의 메서드 명을 소문자로 입력해서 그런 것이었습니다. 다른 것들은 소문자로 해도 괜찮던데 "PATCH" 메서드는 안됩니다.

  ```js
  const response = await fetch(URL, {
    method: 'patch', // patch가 아니라 PATCH 입니다.
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  ```

## React

- **렌더링은 제대로 되는데 이벤트는 걸리지 않았던 문제**  
  src/index.html에 \<script\>코드가 직접적으로 삽입되어서 그런 것이었습니다.

    ```html
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <div id="app"></div>
        <script src="main.js"></script>
        <!-- 이 <script> 부분은 웹팩의 HtmlWebpackPlugin이 자동으로 삽입해주기 때문에 없어야 함 -->
      </body>
    </html>
    ```
