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

- **styled-components: Over 200 classes were generated for component styled.div. Consider using the "attrs" method, together with a style object for frequently changed styles.`**  
  styled-components의 attrs 속성은 정적인 속성, 예를들면 input의 type이나 radio 버튼의 checked와 같은 것들을 설정할 수 있으며, 동적으로 변화하는 속성에 대해서도 사용하여 최적화 할 수 있습니다. 제가 겪었던 이슈는 attrs를 사용하지 않고 템플릿 리터럴 내부에 "${}"를 사용하여 onChange에 따라 색변경을 해주었었는데, 이렇게 하게되니 렉이 걸리고 해당 에러가 발생했습니다. 이 상황에서 attrs를 사용하면 최적화를 해주는 것 같습니다.

    ```js
    // 기존 코드
    const Layout = styled.div`
      font-size: 16px;
      color: ${props => props.color};
    `;

    // attrs를 사용한 코드
    const Layout = styled.div.attrs(props => ({
      color: props.color,
    }))`
      font-size: 16px;
    `;
    ```

- **image파일을 import하는 컴포넌트에 대한 테스트 에러 해결방법**  
  웹에서는 image 파일을 webpack file-loader를 사용하여 불러오지만 jest를 사용하는 테스트 환경에서는 image 파일(혹은 CSS 파일)을 불러올 수가 없습니다. 따라서 이 경우에는 에러가 발생하는데 해당 에러는 다음과 같이 해결할 수 있습니다.

    ```js
    // npm i -D babel-jest
    
    // jest.config.js
    module.exports = {
      moduleNameMapper: {
        "^.+\\.(png|jpg|css)$": "babel-jest",
      },
    };
    ```

## Webpack

- **Module not found: Error: Can't resolve ...**  
  분명 path를 제대로 설정했는데도 해당 에러가 발생한다면... 아마 webpack의 resolve extensions를 설정해주지 않은 것은 아닌지 확인해보면 좋을 것 같습니다.  
  resolve extensions는 import 할 때 확장자를 붙이지 않아도 되도록 하는 역할을 합니다.

    ```js
    module.exports = {
      ...
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      ...
    };
    ```
