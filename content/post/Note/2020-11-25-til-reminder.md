---
title: "TIL 복습할 내용"
date: 2021-02-02
tag: ["Note"]
---

<!-- 03.15까지 작성 -->


### Caching Decorator

  ```js
  const cachingDecorator = (func) => {
    const cache = new Map();

    return (...params) => {
      const key = params.join(',');
      
      if (cache.has(key)) {
        console.log('returns cached result');

        return cache.get(key);
      }

      console.log('starts caching');

      const y = func(...key.split(','));
      cache.set(key, y);
      
      return y;
    }
  }

  const myFunc = (x, y, ...) => {...}
  const cachedFunc = cachingDecorator(myFunc);

  cachedFunc(2, 2); // starts caching
  cachedFunc(2, 2); // returns cached result
  cachedFunc(2); // starts caching
  cachedFunc(2); // returns cached result
  cachedFunc(3); // starts caching
  cachedFunc(3); // returns cached result
  ```

### 객체 프로퍼티에 접근 제어하는 방법

객체의 프로퍼티는 저희가 흔히 알고있는 value 외에도 flag라고 불리는 특별한 속성 세 가지를 갖습니다. 그리고 Object.getOwnPropertyDescriptor 메서드를 통해 확인할 수 있으며, Object.defineProperty 메서드를 통해 객체 프로퍼티에 대한 제어를 관리할 수 있습니다.  
flag에는 writable, enumerbale, configurable 세 가지 속성이 있습니다.  
이렇게 프로퍼티 각각에 대해 제어하는 방법 외에도, Object.freeze나 Object.seal과 같이 객체 내 전체 프로퍼티를 대상으로도 제약사항을 만들 수 있습니다.

### 소프트웨어 버전 규칙

`v주.부.수`의 구성으로 되어있으며 보통 `v3.6.1`과 같이 사용합니다.  
주(Major): 기존 버전과 호환되지 않게 API가 바뀌는 경우 변경  
부(Minor): 기존 버전과 호환되면서 새로운 기능을 추가하는 경우 변경  
수(Patch): 기존 버전과 호환되면서 버그를 수정한 경우 변경

### 웹 최적화 방법

- **첫 페이지 로딩 지연문제 해결 방법**  
  - HTML 파싱 방해하지 말기
  - Build를 통한 코드 최적화 (압축 및 파일 합치기)
  - Lazy Loading
- **반응 지연, 애니메이션 지연 해결 방법**
  - 메인쓰레드를 Blocking 하지 않기 위한 내부 조치 (Fiber architecture)
  - Re-rendering 최소화 (React.memo, useCallback, useMemo)
  - 중복 계산 줄이기 (useMemo)
  - 네트워크 요청 캐시하기 (Service Worker, Cache header 전략)
  - 복잡한 연산 위임하기 (Web Worker 활용)

### 반응형 웹의 기준 픽셀

- 320px (smaller phone viewpoints)
- 480px (small devices and most phones)
- 768px (most tablets)
- 992px (smaller desktop viewpoints)
- 1200px (large devices and wide screens)

### 기본적인 HTML 지식

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


### 크롬 브라우저의 내부

- 크롬은 브라우저 프로세스(브라우저의 UI 부분), 렌더러 프로세스(웹 사이트가 표시되는 모든 부분), 플러그인 프로세스(Flash 같은 웹 사이트에서 사용하는 플러그인), GPU 프로세스 등 여러 개의 프로세스로 이루어져 있습니다.
- 크롬은 예전에는 탭마다 렌더러 프로세스를 할당했지만, 이제는 사이트(iframe에 있는 사이트 포함)마다 렌더러 프로세스를 할당한다고 합니다.
- 이렇게 다중 프로세스 아키텍처를 사용하게 되면, 어떤 탭(사이트)에 문제가 생겨도 다른 탭에 영향을 주지 않을 수 있어서 안정적이고 좋은 사용자 경험을 제공할 수 있습니다. 하지만 프로세스간 메모리 공유가 되지 않아서 메모리를 많이 사용하게 된다는 단점이 생기게 됩니다.
- 크롬은 이와 같은 단점을 최소화 하기 위해 성능 좋은 하드웨어에서 크롬이 실행중일 때는 각 서비스를 여러 프로세스로 분할해 안정성을 높이고, 리소스가 제한적인 장치에서 실행중일 때는 여러 서비스를 하나의 프로세스에서 실행해서 메모리 사용량을 줄입니다.

### TTFB

TTFB란 Time To First Byte로, HTTP 요청을 보냈을 때 처음 byte(정보)가 브라우저에 도달하기까지의 시간을 말합니다. 즉, TTFB는 서버 프로세싱, DNS, TCP 등등이 복합적으로 수행된 시간을 나타내주는 수치라고 볼 수 있습니다.

### JavaScript 정규식

- `/[]/` 문자셋
- `/[0-9]/` 숫자인 애들만
- `/[\d]/` 숫자인 애들만
- `/[\D]/` 숫자가 아닌 애들만
- `/[a-zA-Z]/` 문자인 애들만
- `/[\w]/` 문자인 애들만
- `/[\W]/` 문자가 아닌 특수문자만
- `/[\s]/` 공백인 애들만
- `/[\S]/` 공백이 아닌 애들만
- `.` 1개의 글자를 나타냄 (/a.c/ 는 abc, aac 등과 매치됨)
- `\` 0개 이상의 글자를 나타냄 (/ab*c/는 ac, abc, abbc, abbbc 등과 매치됨)
- `*` 0개이거나 1개인 글자를 나타냄 (/ab?c/ 는 ac와 abc 등과 매치됨)
- `+` 앞에있는 문자가 연속됨을 나타냄 (/a+/ 는 a, aa, aaa 등과 매치됨)
- `\d{3, 4}` 연속되는 숫자가 3개 혹은 4개인 것들을 나타냄

### Webpack url-loader

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

### JavaScript의 Blocking? Non-Blocking?

JavaScript의 메인 쓰레드는 최대한 빨리 끝내주는 게 좋습니다. 이렇게 메인 쓰레드를 빨리 끝내주기 위해서는 다른 쓰레드에게 일부 일을 맡기는 방식을 사용할 수 있습니다. 원래 폰 노이만 머신은 Blocking이 강제되지만, 이는 어쩔 수 없는 부분이기 때문에 Blocking을 최소화하는 방향으로 가게 되는데 이를 Non-Blocking이라고 합니다. 즉, 이런 Non-Blocking을 위해서 앞서 말했듯, 메인 쓰레드의 일을 다른 쓰레드에게 맡김으로써 Blocking을 줄입니다. 예를 들어 원래 메인 쓰레드가 10초 동안 작업을 Blocking으로 하게된다고 할 때, 5초의 작업은 다른 쓰레드에게 맡김으로써 메인 쓰레드의 Blocking 시간을 5초로 줄일 수 있는데, JavaScript에 이를 적용하면 메인쓰레드가 JavaScript 싱글쓰레드, 다른 쓰레드가 웹 워커 쓰레드라고 볼 수 있습니다. 아울러 다른 쓰레드의 작업이 완료된 후의 결과물을 메인쓰레드가 받아서 다시 처리하기까지 메인쓰레드는 대기하고 있다가 결과가 오면 처리를 하기 시작하는데 이것이 바로 JavaScript의 이벤트루프라고 볼 수 있습니다.

### Progressive Rendering

Progressive Rendering이란 서버가 전체 페이지를 한번에 내려주는 게 아니라 필요한(중요한) 웹 페이지의 일부를 클라이언트로 스트리밍하면서 순차적으로 렌더링하는 기술입니다. 이를 통해 콘텐츠를 빠르게 표시할 수 있으며 사용자가 인식하는 로딩시간을 향상시킬 수 있습니다. 사례로는 이미지의 레이지로딩이 있지만 더 넓은 범위로 사용됩니다.

### img 태그에 srcset 속성

srcset 속성은 해당 이미지 엘리먼트에 가능한 이미지들을 명시하기 위해 사용되며, 이를 통해 해상도에 따라 다른 이미지를 제공할 수 있게 합니다. 예를 들어, 820 x 1080 짜리 이미지가 있을 때, 이는 브라우저에서는 사용할만하지만 모바일 화면에서는 굳이 저렇게 큰 이미지를 불러오는 것과 화면에 맞는 작은 이미지를 불러오는 것과 보이는 것에는 큰 차이가 없으므로 용량이 더 작은 이미지를 불러오는 게 좋습니다. 이럴 때 사용합니다.

<!-- 
### element.insertAdjacentElement('position', 'target')

insertAdjacentElement를 사용하면 돔의 위치를 변경할 수 있습니다.  
position은 총 4가지가 있습니다.

- beforebegin: element 앞에 붙임
- beforeend: element의 안에 가장 마지막 child로 붙임
- afterbegin: element의 안에 가장 첫번째 child로 붙임
- afterend: element 뒤에 붙임

### document.elementFromPoint(x, y)

elementFromPoint를 이용하여 해당 좌표에 맞는 DOM을 찾을 수 있습니다. 예제는 다음과 같습니다.

  ```js
  window.addEventListener('mousemove', (event) => {
    const { pageX, pageY } = event; // 현재 마우스의 좌표 값
  
    const targetElement = document.elementFromPoint(pageX, pageY);
    console.log(targetElement);
  });
  ```

### JavaScript에서 타입 체크하는 정확한 방법

toString.call(target) 을 사용하면 됩니다.

  ```js
  const a = 10;
  const b = '배고파';
  const c = { name: 'woomin' };
  const d = [1, 2, 3];
  const e = () => { return 10; };
  
  toString.call(a); // '[object Number]'
  toString.call(b); // '[object String]'
  toString.call(c); // '[object Object]'
  toString.call(d); // '[object Array]'
  toString.call(e); // '[object Function]'
  ```

### jwt에 토큰 만료 설정하기

jsonwebtoken 라이브러리에서도 토큰의 만료를 설정할 수 있다는 사실을 알고 이를 적용해보았습니다.

  ```js
  const data = { iss, id, userInfo };
  const secret = process.env.JWT_SECRET;
  const expire = { expiresIn: '30m' };

  const token = jwt.sign(data, secretKey, expire);
  ```

  그리고 만료를 확인하는 로직은 다음과 같습니다.

  ```js
  jwt.verify(token, secret, (err, decoded) => { // 토큰이 만료되면 err가 발생합니다.
    if (err || decoded.iss !== process.env.TOKEN_ISS) {
      res.status(401).json({ error: 'Auth Error' });
    }
  });

  /*
  err = {
    name: 'TokenExpiredError',
    message: 'jwt expired',
    expiredAt: 1408621000
  }
  */
  ```

### Jest로 모듈 mocking 하기

먼저, jest.fn()을 사용하여 모듈을 모킹할 수 있습니다.

  ```js
  import utilFunction from './util';

  utilFunction.getCurrrentDate = jest.fn().mockReturnValue('2020-11-18');
  ```

  위의 경우는 utilFunction이 객체 형태이고 그 내부의 프로퍼티는 상태를 변경할 수 있기 때문에(할당 가능하기 때문에) 바로 jest.fn() 함수를 할당함으로써 mocking을 하였습니다. 하지만 아래와 같은 경우는 jest.fn()을 사용할 수 없습니다.

  ```js
  import { getCurrentDate } from './util';
  import axios from 'axios'; // 외부 모듈

  getCurrentDate = jest.fn(); // Error: "getCurrentDate" is read-only
  axios = jest.fn(); // Error: "axios" is read-only
  // 두 경우 모두 const이기 때문에 값을 할당하는 것이 불가능합니다.
  ```

  따라서 이와 같은 경우에는 jest에서 제공하는 jest.mock() 함수를 사용해야 합니다.

  ```js
  import axios from 'axios'; // 외부 모듈

  jest.mock('axios');

  axios.mockImplementation(() => {...}); // 모킹 함수 작성
  ```

### JavaScript에서 클립보드에 copy하는 방법

  ```js
  const FROM_BEGINNING = 0;
  const TO_END = 99999;

  const temptCopyTarget = document.createElement("textarea");

  temptCopyTarget.value = `${location.origin}/${latexInput}`;

  document.body.appendChild(temptCopyTarget);
  temptCopyTarget.select();
  temptCopyTarget.setSelectionRange(FROM_BEGINNING, TO_END); // 모바일 환경에서 필요한 로직입니다
  document.execCommand("copy");
  document.body.removeChild(temptCopyTarget);
  ```

  이렇게 원하는 값을 클립보드에 넣을 수도 있고, createElement 없이 그냥 textarea나 input 돔 자체를 select()해서 그 안의 value를 클립보드에 넣을수도 있습니다.

### JavaScript에서 이미지 파일을 다운받는 방법

anchor 태그를 이용해서 구현할 수 있습니다.

  ```js
  const virtualLink = document.createElement("a");

  virtualLink.href = 'image base64 here'
  virtualLink.download = "your_file_name.png";

  document.body.appendChild(virtualLink);
  
  virtualLink.click();
  
  document.body.removeChild(virtualLink);
  ``` -->

