---
title: "Error Note"
date: 2020-10-28
tag: ["Note"]
---

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
        <!-- 이 <script> 부분은 웹팩이 자동으로 삽입해주기 때문에 없어야 함 -->
      </body>
    </html>
    ```
