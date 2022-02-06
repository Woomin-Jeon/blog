---
title: "Note"
date: 2000-01-01
category: "All"
draft: true
---

## React Fiber

React Fiber에 대한 아티클을 읽고 정리해보았습니다.  
  - 돔을 조작하는 로직이 많아지면 콜스택에 아직 로직이 쌓여있기 때문에 렌더링이 일어날 수 없습니다.
  - 이로인해 렌더링이 밀리면서 애니메이션 같은 것들이 버벅이게 됩니다.
  - Fiber는 여기서 렌더링과 같은 비동기처리들이 밀리지 않게 하기 위해 리액트 코드를 실행 중에 중단시키고 이벤트 큐에서 대기하는 태스크들을 처리한 뒤, 다시 실행중이던 리액트 코드의 위치로 돌아가서 처리할 수 있도록 합니다.
  - 이를 통해 돔을 조작하는 로직이 많아져도 자연스럽게 애니메이션이 진행될 수 있도록 합니다.
  - 이때 리액트 코드 중간에 비동기 처리를 실행하기 위한 방법으로 `requestIdleCallback` 함수를 사용해서 리액트 코드를 호출하며, 실행중이었던 위치로 돌아오기 위해 stack을 구현하여 사용합니다.
  - 참고로 `requestIdleCallback의` 폴리필은 `setTimeout 0`을 이용합니다.

## touch 스크롤 막기

addEventListener의 `passive: true` 옵션은 브라우저에게 preventDefault()를 호출하지 않겠다고 알리는 역할을 합니다. 브라우저는 스크롤링을 발생시키는 이벤트를 감지했을 때 먼저 모든 핸들러를 처리하는데, 이때 preventDefault가 어디에서도 호출되지 않았다고 판단되면, 그제야 스크롤링을 진행합니다. 이 과정에서 불필요한 지연이 생기고, 화면이 "덜덜 떨리는" 현상이 발생합니다. `passive: true` 옵션은 핸들러가 스크롤링을 취소하지 않을 것이라는 정보를 브라우저에게 알려주는 역할을 합니다. 이 정보를 바탕으로 브라우저는 화면을 최대한 자연스럽게 스크롤링 할 수 있게 하고 이벤트는 적절하게 처리됩니다.  
([출처: 모던자바스크립트 튜토리얼](https://ko.javascript.info/default-browser-action))

## 패키지를 만들 때 주의해야 할 점

- `peerDependancy`란 어떤 패키지를 배포하고 누군가 제 패키지를 설치할 때, 제 패키지에 존재하는 peerDependancies를 dependency로 설치해야함을 의미합니다. Yarn 공식문서를 보면 peerDependancies가 자신만의 패키지를 배포할 때 사용하게 되는 dependencies 종류라고 하네요.
    - dependencies : yarn install 시에 설치된 버전을 체크해 기존것이 있더라도 선언된걸 우선적으로 쓰고, 없으면 같이 설치됨
    - devDependencies : yarn install 시에 같이 설치됨
    - peerDependnecies : yarn install 시에 기존 것이 있으면 그걸 씀 (없으면 같이 설치됨: 근데 이건 패키지 매니저별로 동작이 다름) 
- 패키지를 배포할 때 webpack.config.js의 `externals` 옵션을 사용하면 denpandencies들을 번들파일에서 뺄 수 있습니다. 만약 이를 빼지 않는다면 dependency 코드들이 번들파일에 포함되게 되고, 만약 해당 패키지를 사용하는 쪽에서 동일한 dependancy를 가지는 패키지를 사용한다면 중복코드가 발생하게 됩니다. 따라서 패키지를 번들링하여 배포할 때는 externals 옵션을 이용해서 제거하는 게 좋습니다.

## 반응형 웹의 기준 픽셀

- 320px (smaller phone viewpoints)
- 480px (small devices and most phones)
- 768px (most tablets)
- 992px (smaller desktop viewpoints)
- 1200px (large devices and wide screens)

## 기본적인 HTML 지식

- **language code**  
  language code는 선택사항이지만 작성하는 것이 접근성 측면에서 좋습니다.

    ```html
    <html lang='ko'></html>
    ```

- **meta 데이터**  
  meta data는 다른 문서나 다른 머신에게 해당 문서(HTML)에 대한 정보를 제공하는 데이터입니다.

- **\<head\> 요소에 필요한 것들**  
  head 요소에는 3가지 요소가 필수적으로 들어갑니다.

    ```html
    <head>
      <title>Document Title</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="initial-scale=1, width=divice-width">
    </head>
    ```

  - 먼저 \<title\>에는 해당 문서의 제목을 명시하게되며,  
  - \<meta charset="UTF-8"\>에는 해당 문서의 Character Set을 명시해주게됩니다. 만약 Character Set을 명시하지 않으면 글자가 깨질 수 있기에 필수적입니다.
  - \<meta name="viewport"\>에는 처음 이 문서가 렌더링 될 때 어떤 식으로 렌더링될지를 명시하는 용도입니다. 모바일이나 태블릿PC에 대응하기 위해서 반드시 필요합니다.

- **SEO에 도움을 주는 meta data description**  
  
    ```html
    <meta name="description" content="메타데이터 요소에 대한 설명을 다루는 웹 페이지 입니다.">
    ```

- **시멘틱 HTML**  
  - heading(\<h1\>, \<h2\>, ...)을 사용하여 콘텐츠의 제목을 나타낼 수 있습니다.
  - \<article\>, \<section\> 요소는 페이지의 구역을 나누는 데 사용됩니다. 대부분의 \<div\>는 이것들로 대체할 수 있습니다.  
    아울러 \<section\> 요소 내부에는 CSS로 가리는 한이 있더라도 heading을 명시해주는 게 좋습니다.
  - \<header\>, \<footer\>, \<nav\>, \<aside\> 요소는 각각 용법에 따라 적극적으로 사용합니다.
  - \<hgroup\> 요소를 통해 heading을 그루핑 할 수 있습니다.
  - \<address\> 요소를 사용하여 페이지 copyright, 출처, 기타 등등을 담을 수 있습니다.

## Webpack url-loader

url-loader는 이미지를 자동으로 Base64로 인코딩하여 문자열 형태로 소스코드에 넣어주는 역할을 합니다. 작은 이미지 같은 경우는 이렇게 Base64로 변환하는 것이 효율적입니다. 설정은 다음과 같이 합니다.

  ```js
  // webpack.config.js
  {
    test: /\.png$/, // png 파일에 대해서
    use: {
      loader: 'url-loader',
      options: {
        publicPath: './dist/', // 빌드 파일이 있는 dist를 public path로 설정
        name: '[name].[ext]?[hash]',
        limit: 5000 // 5KB 미만 파일만 data url로 처리
      }
    }
  }
  ```

  url-loader의 fallback 기본 값은 file-loader이므로 5KB가 넘어가는 이미지 파일은 자동으로 file-loader가 처리합니다.

## img 태그에 srcset 속성

srcset 속성은 해당 이미지 엘리먼트에 가능한 이미지들을 명시하기 위해 사용되며, 이를 통해 해상도에 따라 다른 이미지를 제공할 수 있게 합니다. 예를 들어, 820 x 1080 짜리 이미지가 있을 때, 이는 브라우저에서는 사용할만하지만 모바일 화면에서는 굳이 저렇게 큰 이미지를 불러오는 것과 화면에 맞는 작은 이미지를 불러오는 것과 보이는 것에는 큰 차이가 없으므로 용량이 더 작은 이미지를 불러오는 게 좋습니다. 이럴 때 사용합니다.
