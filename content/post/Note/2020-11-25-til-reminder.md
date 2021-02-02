---
title: "TIL 복습할 내용"
date: 2021-02-02
tag: ["Note"]
---

### axios withCredential 옵션

CORS에서는 기본적으로 쿠키를 request headers에 넣어주지 않기 때문에, axios에 { withCredentials: true } 옵션을 넣어줌으로써 request headers에 쿠키를 넣을 수 있습니다. withCredentials는 서버에서도 response headers에 쿠키를 넣을지 말 지 정하는 옵션이기도 합니다. 즉, withCredentials 옵션은 쿠키를 보낼지 말지에 관한 것으로 볼 수 있습니다. 주의해야할 점은, withCredentials가 true라면 Access-Control-Allow-Origin을 와일드카드(*)가 아니라 직접 url을 설정해 주어야 한다는 것에 유의해야합니다.

### GitHub Action

[https://www.dahae.kim/blog/github-actions-cicd/](https://www.dahae.kim/blog/github-actions-cicd/)

### CSS flex-wrap

CSS flex-wrap property는 flex-item 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는 속성입니다.

### CSS 애니메이션

처음으로 CSS 애니메이션에 대해 공부해보았는데 간단한 작업은 그렇게 어렵진 않았습니다. 현재 제게 필요한 애니메이션 기능은 메뉴 버튼을 눌렀을 때 슬라이드로 나오는 것인데 이에 대해 필요한 것들은 다음과 같습니다.

- `@keyframes` 키워드를 사용하여 애니메이션 효과를 지정할 수 있습니다. 이 키워드 다음에는 해당 애니메이션의 이름을 적습니다.
- `animation-name` 을 통해 앞선 @keyframes에서 지정한 이름의 애니메이션을 엘리먼트에 적용할 수 있습니다.
- `animation-duration` 속성을 통해 애니메이션의 최대 지속시간을 지정할 수 있습니다. 예를 들어 0% ~ 100%까지의 duration을 1초로 주면 1초 내로 0% ~ 100% 까지의 애니메이션이 완료되며, duration을 10초로 주면 1초에 10% 씩 진행됩니다.
- `animation-iteration-count` 속성을 통해 애니메이션을 몇 번 반복시킬 지 정할 수 있습니다. 값으로 infinite를 사용하면 무한으로 반복됩니다.
- `animation-fill-mode` 속성으로 애니메이션이 끝났을 때의 엘리먼트 위치를 지정해줄 수 있습니다. 값으로 none, forward, backward, both를 지정할 수 있으며, 제가 슬라이드 애니메이션을 사용하기에는 딱 슬라이드되어 나온 뒤 그 자리에 멈춰있어야하므로, 즉 엘리먼트가 애니메이션이 끝난 지점의 위치를 그대로 수용해야하므로 forward가 어울립니다.

아래는 이에 대한 코드입니다. 이렇게 하면 가로세로 100px 짜리 정사각형이 색을 바꾸며 이동한 뒤 멈춥니다.  

  ```css
  div {
    position: absolute;
    width: 100px;
    height: 100px;

    animation-name: moving;
    animation-duration: 5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes moving {
    0%   { left: 0px;   background: yellow; top: 0px;   }
    25%  { left: 0px;   background: blue;   top: 300px; }
    50%  { left: 300px; background: pink;   top: 300px; }
    75%  { left: 300px; background: black;  top: 0px;   }
    100% { left: 600px; background: yellow; top: 0px;   }
  }
  ```

### element.insertAdjacentElement('position', 'target')

insertAdjacentElement를 사용하면 돔의 위치를 변경할 수 있습니다.  
position은 총 4가지가 있습니다.

- beforebegin: element 앞에 붙임
- beforeend: element의 안에 가장 마지막 child로 붙임
- afterbegin: element의 안에 가장 첫번째 child로 붙임
- afterend: element 뒤에 붙임

### document.elementFromPoint(x, y)

elementFromPoint를 이용하여 해당 좌표에 맞는 돔을 찾을 수 있습니다. 예제는 다음과 같습니다.

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

### canvas 사용하기

canvas 설정

  ```js
  const app = document.querySelector('#app');
  app.innerHTML = `
    <h1>Canvas Practice</h1>
    <canvas id="canvas" width="500" height="500"></canvas>
  `;
  /**
   * canvas 속성 중 width와 height가 있는데 이를 CSS를 사용하여 설정하면 왜곡되어
   * 나타날 수 있기 때문에 돔 프로퍼티로서 직접 설정해주는 편이 권장됩니다.
   */

  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  /**
   * getContext를 사용해서 랜더링 컨텍스트와 렌더링 컨텍스트의 그리기 함수들을 사용할 수 있습니다.
   */
  ```

  사각형
  
  ```js
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(10, 10, 50, 50);
  /**
   * fillRect 함수는 사각형을 그리는 함수로
   * fillRect (x, y, width, height) 입니다. 항상 canvas의 (0, 0)이 기준입니다.
   */
  ctx.clearRect(45, 45, 70, 70); // clearRect 함수는 사각형을 비우는 함수입니다.
  ctx.strokeRect(60, 60, 40, 40); // strokeRect 함수는 윤곽선을 그리는 함수입니다.
  ```

  선

  ```js
  ctx.beginPath(); // 선을 그릴 것임을 선언하는 함수입니다.
  ctx.moveTo(200, 200); // 초기 시작 좌표를 지정합니다.

  ctx.lineTo(300, 200); // lineTo 함수는 선을 그리는 함수입니다.
  ctx.lineTo(300, 300);

  ctx.stroke(); // 선으로 그립니다.
  ctx.closePath(); // 선 그리기를 마칩니다.

  /**
   * ctx.closePath() 다음 ctx.stroke()를 실행하면 도형(선)으로 만들어집니다.
   *
   * ctx.fill(); 하나만으로 도형(면)을 그릴 수있습니다.
   * fill 함수는 closePath 함수를 포함하기 때문에 closePath를 호출할 필요가 없습니다.
   */
  ```

  원

  ```js
  ctx.fillStyle = "rgb(100, 100, 100)";
  ctx.beginPath();
  ctx.arc(200, 200, 70, getRadianByDegree(0), getRadianByDegree(90), false);
  /**
  * arc(원의 중심 x좌표, 원의 중심 y좌표, 반지름, 시작 각도, 끝나는 각도, 시계방향/반시계방향)
  */
  ctx.lineTo(200, 200);
  ctx.fill();
  ```

### git 충돌시 해결 흐름
  
  ```bash
  $ git fetch upstream master # 원격 레포지토리의 데이터 가져오기
  $ git rebase upstream/master # 내 브랜치에 병합

  # 충돌!

  # 파일들을 살펴보며 충돌한 내용들 수정

  $ git add . # 수정한 파일들 staged
  $ git rebase --continue # 커밋

  # 만약 git이 꼬여서 rebase 전으로 되돌리고자 한다면
  $ git rebase --abort
  ```

### Webpack css-loader와 style-loader

웹팩에서는 css 로더와 style로더를 같이쓰는데 이유는 다음과 같습니다.  
css-loader는 CSS 파일을 JS 파일로 변환시켜주는 역할을 합니다. 그리고 style-loader는 자바스크립트로 변경된 스타일시트를 동적으로 head태그에 추가해주는 역할을 합니다.

### URLSearchParams & useLocation으로 리액트에서 쿼리 데이터 추출하기

URLSearchParams는 JavaScript 내장 객체로 URL의 쿼리 문자열에서부터 데이터를 추출할 수 있습니다. 다음은 URLSearchParams와 useLocation을 사용하여 리액트에서 쿼리스트링을 추출하는 예제입니다.

  ```jsx
  import { useLocation } from 'react-router-dom';

  const queryString = useLocation().search; // ?name=woomin&age=25
  const searchParams = new URLSearchParams(queryString);
  // URLSearchParams { name => woomin, age => 25}

  console.log(searchParams.get('name')); // woomin;
  console.log(searchParams.get('age')); // 25;
  ```

### Drag and Drop Event

JavaScript를 이용해서 Drag and Drop 기능을 사용할 수 있습니다. 필요한 키워드는 다음과 같습니다.  
  
- 드래그를 잡을(drag) 엘리먼트에 대해서
    - **draggable 속성**을 걸어주어야 Drag를 사용할 수 있습니다.
    - **dragstart 이벤트**는 드래그를 하기 위해 엘리먼트를 집으면 발생하는 이벤트입니다.
    - **event의 dataTransfer.setData 메서드**는 드롭할 대상으로 보낼 데이터를 설정하는 방법입니다.  
- 드래그를 놓을(drop) 엘리먼트에 대해서
    - **droppable 속성**을 걸어주어야 Drop을 사용할 수 있습니다.
    - **dragover 이벤트**에 **preventDefault()** 함수를 걸어줘야 drop을 막던 제한을 해제할 수 있습니다.
    - **drop 이벤트**는 말 그대로 드래그 했던 대상을 놓을 때 발생하는 이벤트입니다.
    - **event의 dataTransfer.getData 메서드**는 드래그한 대상으로부터 데이터를 받는 방법입니다.  

간단한 코드는 다음과 같습니다. target은 드래그 할 엘리먼트이고, zone은 드롭할 엘리먼트입니다.

  ```js
  const target = document.createElement('div');
  target.setAttribute('draggable', 'true');
  target.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('name', 'woomin');
  });

  const zone = document.createElement('div');
  zone.setAttribute('droppable', 'true');
  zone.addEventListener('dragover', (event) => event.preventDefault());
  zone.addEventListener('drop', (event) => {
    console.log('data: ', event.dataTransfer.getData('name'));
  });

  // target을 드래그해서 zone에 드롭 하게되면 'woomin'이 출력됩니다.
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

### Redux Toolkit의 목적

*다음은 공식 문서에 나와있는 "Redux Toolkit의 목적"에 대해서 제가 이해한 바를 바탕으로 정리한 내용입니다.*  

Redux Toolkit은 Redux 로직을 작성하는 표준화된 방법으로써 고안되었으며, 기존의 Redux가 갖고 있던 세 가지 문제들을 해결하기 위해 만들어졌습니다.
1. Redux store를 설정(config)하는 것이 너무 복잡하다.
2. Redux를 유용하게 사용하기 위해서는 package를 많이 설치해야 한다.
3. Redux에는 너무 많은 보일러플레이트 코드가 필요하다.
Redux Toolkit은 모든 문제를 해결할 순 없지만, 사용자가 코드를 단순화 하고 쉽게 Redux를 세팅할 수 있도록 하는 도구들을 추상화하여 제공합니다.


### 자식 요소들이 부모의 width를 모두 먹으면서 같은 width로 쪼개지도록 하는 방법

부모 속성에 `display: flex`를 주고, 자식에게 `flex-grow: 1` 속성을 사용하면 됩니다.

  ```css
  .parent {
    width: 200px;
    height: 200px;
    background-color: yellow;
    display: flex;
  }

  .child {
    height: 50px;
    background-color: black;
    flex-grow: 1;
  }
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
  ```

### URL을 인코딩하고 디코딩하는 방법

URL의 쿼리스트링으로 특수문자(수식 - "+", "\" 등등)를 넣을 필요가 있었는데, 이를 넣게되면 브라우저가 URL을 파싱하는 과정에서 이상하게 바뀌는 문제가 있었습니다. 따라서 이 쿼리스트링으로 넣은 값을 인코딩하고 디코딩하는 것이 필요했는데 해당 JavaScript 내장 메서드가 존재했습니다.

  ```js
  const q = "\\frac{1+2+3}{2}";
  const url = `http://localhost:8080?q=${q}`

  const encodedValue = encodeURI(url);
  const decodedValue = decodeURI(encodedValue);

  const encodedValue = encodeURIComponent(url);
  const decodedValue = decodeURIComponent(encodedValue);
  ```

  `encodeURI`는 인터넷 주소에서 사용하는 :, ;, /, =, ?, & 등을 제외하고 인코딩하는 함수이며,  
  `encodeURIComponent`는 모든 문자를 인코딩하는 함수입니다.

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

### class문법의 편의성

생성자 함수를 사용하게되면 불필요하게 계속 생성되는 메서드와 같은 것들은 따로 prototype에 관리해주어 최적화하곤 합니다.

  ```js
  function User(name) {
    this.name = name;
  }
  
  User.prototype.getName = function() {
    return this.name;
  }
  ```

  하지만 class를 사용하게 되면 저렇게 prototype을 따로 분리해줄 필요 없이 한번에 가능합니다. contructor 함수 밖에서 선언된 것들은 모두 prototype에 저장됩니다.

  ```js
  class User {
    constructor(name) {
      this.name = name;
    }

    getName() {
      return this.name;
    }
  }
  ```

### class의 화살표 함수 메서드
  
객체의 메서드로 화살표함수를 사용하면 무조건 전역 객체를 가리키는 문제가 있지만, class의 메서드로 화살표함수를 사용하면 잘 동작합니다. 뿐만아니라 콜백함수로 class의 화살표 함수 메서드를 전달해도 상위 스코프의 this를 가져와서 잘 사용할 수 있습니다.

  ```js
  class User {
    constructor(name) {
      this.name = name;
    }

    getName = () => {
      console.log(this.name);
    }
  }

  const user = new User('woomin');
  setTimeout(user.getName, 1000); // woomin
  ```

### 소프트웨어 버전 규칙

`v주.부.수`의 구성으로 되어있으며 보통 `v3.6.1`과 같이 사용합니다.  
주(Major): 기존 버전과 호환되지 않게 API가 바뀌는 경우 변경  
부(Minor): 기존 버전과 호환되면서 새로운 기능을 추가하는 경우 변경  
수(Patch): 기존 버전과 호환되면서 버그를 수정한 경우 변경


### Promise에 대한 추가적인 지식

- Promise.all의 요소들 중 하나라도 reject되면 Promise.all이 반환하는 Promise는 에러와함께 바로 reject됩니다.
- 이런 문제를 해결하고 정상적으로 fulfilled된 Promise들이라도 받고 싶다면 Promise.allSettled 메서드를 사용하면 됩니다.

### Promise.then

Promise.then 메서드의 첫번째 인자는 프로미스가 resolve되었을 때 실행되는 함수이고, 두번째 인자는 프로미스가 reject되었을 때 실행되는 함수입니다.

  ```js
  new Promise((resolve, reject) => {
    ...
  }).then(
    (value) => console.log(`resolved ${value}`),
    (error) => console.log(`rejected ${error}`)
  )
  ```

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

### 쿠키(Cookie)

쿠키는 `세션 쿠키(Session Cookie)`와 `지속 쿠키(Persistent Cookie)`로 나뉩니다. 만료 날짜/시간을 따로 지정하지 않으면 항상 유지하라는 것으로 간주되어 지속 쿠키에 저장되고, 만료 날짜/시간을 지정하면 세션 쿠키로 저장됩니다. 세션 쿠키는 브라우저 메모리에 저장되므로 브라우저가 종료되면 쿠키는 사라지게 됩니다. 반면 지속 쿠키는 파일로 저장되므로 브라우저가 종료되어도 쿠키는 남아있게 됩니다.


### Context vs Redux

Context는 상태를 관리하는 도구가 아니라 단지 상태를 전달해주는 매커니즘일 뿐이며, 상태는 Context가 아니라 Context의 Store 안에서 useState와 useReducer를 통해 관리됩니다. `상태 관리`는 초기값을 저장하고, 현재 상태를 읽어오며, 상태를 업데이트 할 수 있는 것을 말합니다. useState와 useReducer는 훅을 통해서 초기 상태를 저장하고, 현재 상태를 읽을 수 있으며, setState아 dispatch와 같은 함수를 통해 상태를 업데이트 시킬 수 있다는 점에서 상태관리 도구가 맞습니다. 이러한 맥락에서 Redux역시 상태관리 도구입니다. Redux는 루트 reducer를 통해 초기 상태를 저장하고, store.getState() 함수를 통해 현재 상태를 읽을 수 있고, store.dispatch(action) 함수를 이용해서 상태를 업데이트 할 수 있으며, store.subscribe(listener)를 통해 store가 업데이트 되었다고 리스너에게 알릴 수 있습니다.

### 이벤트 위임의 단점

이벤트 위임을 사용하기 위해서는 이벤트가 반드시 버블링되어야 하지만 focus와 같은 몇몇 이벤트는 버블링되지 않으므로 사용할 수 없고, stopPropagation 메서드를 사용할 수 없습니다.



<!-- 01.22까지 작성 -->
