---
title: "TIL 복습할 내용"
date: 2021-02-02
tag: ["Note"]
---

### withCredential 옵션

CORS에서는 기본적으로 쿠키를 request headers에 넣어주지 않기 때문에, axios에 { withCredentials: true } 옵션을 넣어줌으로써 request headers에 쿠키를 넣을 수 있습니다. withCredentials는 서버에서도 response headers에 쿠키를 넣을지 말 지 정하는 옵션이기도 합니다. 즉, withCredentials 옵션은 쿠키를 보낼지 말지에 관한 것으로 볼 수 있습니다. 주의해야할 점은, withCredentials가 true라면 Access-Control-Allow-Origin을 와일드카드(*)가 아니라 직접 url을 설정해 주어야 한다는 것에 유의해야합니다.

### CSS flex-wrap

CSS flex-wrap property는 flex-item 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는 속성입니다.

### CSS 애니메이션

처음으로 CSS 애니메이션에 대해 공부해보았는데 간단한 작업은 그렇게 어렵진 않았습니다. 현재 제게 필요한 애니메이션 기능은 메뉴 버튼을 눌렀을 때 슬라이드로 나오는 것인데 이에 대해 필요한 것들은 다음과 같습니다.

- `@keyframes` 키워드를 사용하여 애니메이션 효과를 지정할 수 있습니다. 이 키워드 다음에는 해당 애니메이션의 이름을 적습니다.
- `animation-name` 을 통해 앞선 @keyframes에서 지정한 이름의 애니메이션을 엘리먼트에 적용할 수 있습니다.
- `animation-duration` 속성을 통해 애니메이션의 최대 지속시간을 지정할 수 있습니다. 예를 들어 0% ~ 100%까지의 duration을 1초로 주면 1초 내로 0% ~ 100% 까지의 애니메이션이 완료되며, duration을 10초로 주면 1초에 10% 씩 진행됩니다.
- `animation-iteration-count` 속성을 통해 애니메이션을 몇 번 반복시킬 지 정할 수 있습니다. 값으로 infinite를 사용하면 무한으로 반복됩니다.
- `animation-fill-mode` 속성으로 애니메이션이 끝났을 때의 엘리먼트 위치를 지정해줄 수 있습니다. 값으로 none, forward, backward, both를 지정할 수 있으며, 제가 슬라이드 애니메이션을 사용하기에는 딱 슬라이드되어 나온 뒤 그 자리에 멈춰있어야하므로, 즉 엘리먼트가 애니메이션이 끝난 지점의 위치를 그대로 수용해야하므로 forward가 어울립니다.  
<br>
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

### 이미지 Lazy Loading 구현하기

처음부터 모든 이미지를 로드하는 게 아니라, 이미지들이 해당 뷰포트에 위치할 때 로드되도록 구현하여 Lazy Loading을 구현해보았습니다.

  ```js
  const INITIAL_SHOWING_COUNT = 10;
  const images = await loadImagesFromServer();

  app.innerHTML = `
    <div>
      ${images.map((image, index) => `
        <img
          src=${index < INITIAL_SHOWING_COUNT ? '' : image.url}
          data-src=${image.url}
        />
      `)}
    </div>
  `;
  ```

  img의 dataset에 해당 이미지의 url을 넣어놓습니다. 그리고 스크롤 이벤트로 해당 이미지가 뷰포트에 위치할 때 로드해줄 것입니다. INITIAL_SHOWING_COUNT는 Lazy Loading을 하지 않는 첫 화면에 필요한 이미지들을 구분짓기 위해 사용합니다.

  ```js
  const lazyLoadingEvent = () => {
    const lazyImages = document.querySelectorAll('img');
  
    lazyImages.forEach(image => {
      const currentWindowYPosStart = window.pageYOffset;
      const currentWindowYPosEnd = currentWindowYPosStart + window.innerHeight;
  
      if (image.offsetTop < currentWindowYPosEnd) {
        image.src = image.dataset.src; // image의 src에 url를 주입해줍니다.
      }
    });
  };

  window.addEventListener('scroll', lazyLoadingEvent);
  ```

  하지만 이렇게 구현하면 스크롤 이벤트가 너무 잦게 발생하므로 쓰로틀링도 걸어주었습니다.

  ```js
  const throttle = (callbackEvent, ms) => {
    let flag = true;

    return (e) => {
      if (!flag) return;

      callbackEvent(e);
      flag = false;
      setTimeout(() => { flag = true }, ms);
    };
  };

  window.addEventListener('scroll', throttle(lazyLoadingEvent, 200));
  ```

  이렇게 함으로써 제가 임시 구현한 페이지에서 맨 밑까지 내리는데 약 60번 발생했던 이벤트를 15회까지 줄일 수 있었습니다.

### 여러개의 노드를 append하는 방법

appendChild 메서드로는 불가능하고 append 메서드로는 가능합니다.

  ```js
  const newNodes = data.map(text => {
    const node = document.createElement('div');
    node.innerText = text;
  });

  document.body.append(...newNodes);
  ```

### \<textarea\>의 기본 여백

textarea는 inline 속성이기 때문에 아래에 기본 여백이 존재합니다. display: block을 줌으로써 없앨 수 있습니다.


### px, em, rem

px은 항상 고정된 픽셀 단위로 정해지는 것을 말하며, em과 rem은 폰트 사이즈에 따라 정해집니다. 예를 들어 폰트 사이즈가 16px이라면 1em과 1rem은 모두 16px을 의미하게 됩니다.  
em과 rem의 차이점은, em의 경우 해당 엘리먼트의 폰트 사이즈를 기준으로 한다는 점, rem은 \<html\> 요소의 폰트 사이즈(없다면 브라우저의 설정값)를 기준으로 한다는 것입니다. 참고로 일반적으로 브라우저와 \<html\> 요소의 폰트 사이즈는 기본이 16px입니다.

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

### 전위순회와 후위순회

  ```js
  // 전위순회
  const preorder = (node) => {
    if (!node) {
      return [];
    }
    
    return [
      node.number,
      ...preorder(node.leftChild),
      ...preorder(node.rightChild),
    ];
  }

  // 후위순회
  const postorder = (node) => {
    if (!node) {
      return [];
    }
    
    return [
      ...postorder(node.leftChild),
      ...postorder(node.rightChild),
      node.number,
    ];
  }
  ```

### forEach에 대한 추가적인 지식

ES6이후의 forEach와 같이 순회하는 것들은 복사본을 돌립니다. 따라서 다음은 문제가 생기지 않습니다.

  ```js
  const arr = [1, 2, 3, 4];

  arr.forEach((v, i) => {
    arr.splice(i, 1);
  });
  ```

### TTFB

TTFB란 Time To First Byte로, HTTP 요청을 보냈을 때 처음 byte(정보)가 브라우저에 도달하기까지의 시간을 말합니다. 즉, TTFB는 서버 프로세싱, DNS, TCP 등등이 복합적으로 수행된 시간을 나타내주는 수치라고 볼 수 있습니다.

### dialog 태그로 모달창 구현하기

\<dialog\>태그를 활용해서 모달창을 쉽게 구현할 수 있습니다. 하지만 지원율이 낮다는 단점이 있으므로 유의해야 합니다.

  ```html
  <dialog>
    <div>모달창 하위</div>
    <button id="close">닫기</button>
  </dialog>
  <button id="open">열기</button>

  <script>
    const dialog = document.querySelector('dialog');
    const openButton = document.querySelector('#open');
    const closeButton = document.querySelector('#close');

    openButton.addEventListener('click', () => {
      dialog.showModal();
    });

    closeButton.addEventListener('click', () => {
      dialog.close();
    });
  </script>
  ```

  caniuse.com에 찾아보니 지원이 그래도 꽤 되는데 IE랑 파이어폭스가 안되고... 가장 결정적으로 사파리가 안되네요. 그렇다보니 당연히 IOS 사파리도 안돌아가고... 사실상 아직은 쓰기엔 무리가 있을듯 합니다.

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

### Webpack file-loader가 하는 일

file-loader는 파일을 모듈로 사용하게끔 하는 역할도 하지만 웹팩 아웃풋에 파일을 옮겨주는 역할도 합니다. 가끔 빌드했을 때 파일이 자동으로 dist 디렉토리로 안가서 CopyWebpackPlugin을 사용했었는데 이런 이유였나 보네요.

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

<!-- 03.15까지 작성 -->
