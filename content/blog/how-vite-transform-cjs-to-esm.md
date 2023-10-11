---
title: 'Vite는 어떻게 CJS를 ESM으로 바꿀까?'
date: 2023-10-12
category: 'All'
draft: false
---

`Vite`는 개발모드에서 Native ESM을 사용해서 unbundled 상태로 개발 환경을 제공합니다. 그렇기 때문에 파일이 수정되어도 해당 파일만 다시 빌드하고 캐시해서 브라우저에게 제공하기 때문에 어플리케이션이 아무리 커져도 항상 일관적인 속도로 개발모드를 유지할 수 있습니다. 이를 "Unbundled development"라고 하며 말 그대로 번들링하는 게 아니라 Native ESM에 의존해서 브라우저가 처리하도록 하는 방식입니다.

이렇게 Native ESM으로 제공하기 위해서 `Vite`는 "Pre-Bundling"이라는 과정에서 CJS를 ESM으로 바꾸는 과정을 거칩니다.  
(https://vitejs.dev/guide/dep-pre-bundling.html)

<br />

그런데...  
어떻게 `Vite`는 CJS를 ESM으로 바꾸는 걸까요?

만약 ESM을 CJS로 바꾼다면, ESM은 정적 모듈 시스템이기에 파일 상단에 선언된 import 문을 require로 바꾸고, export 문을 module.exports로 바꾸는 등의 모듈 선언부 코드만 변경하는 과정만 거치면 될 것 같았습니다.  
반면에 CJS는 동적 require도 사용할 수 있다보니 정적 분석을 통한 모듈 그래프를 그리기 어렵고, import 문으로 바꿨을 때 어떤 값이 들어갈지 알 수가 없어서 CJS를 ESM으로 바꾸는건 힘들거라 생각했습니다.

```js
const packagePath = Math.random() > 0.5 ? './package/a' : './package/b'
const myPackage = require(packagePath) // 이렇게 런타임에 어떤 값이 할당될지 모르는 require 문을

// ESM으로 바꾸면...
import myPackage from Math.random() > 0.5 ? './package/a' : './package/b' // ...? 불가능!
```

하지만 Vite에서는 CJS 모듈을 import 문으로 불러와도 잘 동작하기에 도대체 어떻게 동작하는건지 궁금해졌습니다.

<br />

## Vite 개발모드에 어떤 파일들이 내려오는지 까보자

먼저 `yarn create vite`의 Vanilla Javascript 옵션을 선택해서 의존성을 최소화 시켜주고 `lodash.first`라는 아주 작은 CJS 라이브러리를 설치해서 사용했습니다.

```js
// main.js
import first from "lodash.first"

console.log('Hello World!') // Hello World!
console.log(first([1, 2, 3])) // 1
```

그리고 `Vite`로 개발서버를 실행한 후 브라우저 네트워크 탭을 까보니 main.js 파일은 다음과 같이 ESM으로 유지되어 내려오고, 

```js
import __vite__cjsImport0_lodash_first from "/node_modules/.vite/deps/lodash__first.js?v=46df0ace";
const first = __vite__cjsImport0_lodash_first.__esModule ? __vite__cjsImport0_lodash_first.default : __vite__cjsImport0_lodash_first

console.log('Hello World!')
console.log(first([1, 2, 3]))
```

`lodash.first`는 다음과 같이 바뀌어서 내려왔습니다.

```js
// 번들링 전 (/node_modules/lodash.first/index.js)
function first(array) {
  return array ? array[0] : undefined;
}

module.exports = first;

// 번들링 후 (/node_modules/.vite/deps/lodash__first.js?v=46df0ace)
import { __commonJS } from "/node_modules/.vite/deps/chunk-76J2PTFD.js?v=46df0ace";

var require_lodash_first = __commonJS({
  "node_modules/lodash.first/index.js"(exports, module) {
    function first(array) {
      return array ? array[0] : void 0;
    }
    module.exports = first;
  }
});

export default require_lodash_first();
```

보시면, `__commonJS`라는 함수로 `lodash.first`의 코드가 감싸져 있으며, 결과적으로 `lodash.first`는 `__commonJS` 함수에서 주입해주는 `module`이라는 변수에 `first` 함수를 할당하게 됩니다. 그리고 이 `__commonJS` 코드는 다음과 같이 제공됩니다.

```js
// /node_modules/.vite/deps/chunk-76J2PTFD.js?v=46df0ace
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

export { __commonJS };
```

여기서 당장 이해에 필요없는 코드를 제거하고 앞선 `lodash.first` 코드와 함께 용례 기반으로 코드를 살펴보면,

```js
// 위의 Vite에 의해 번들링된 lodash.first 코드입니다.
var require_lodash_first = __commonJS({
  "node_modules/lodash.first/index.js"(exports, module) {
    function first(array) {
      return array ? array[0] : void 0;
    }
    module.exports = first;
  }
});

const __commonJS = (cb) => {
  const __require = () => {
    // 첫번째 프로퍼티인 "node_modules/lodash.first/index.js"를 키로 갖는 함수입니다.
    const firstProperty = cb[Object.getOwnPropertyNames(cb)[0]];

    // 참조 값으로 삼을 module 객체를 정의합니다.
    const module = { exports: {} };
    
    // 이 실행부에서 lodash.first 코드의 module.exports = first 부분을 통해
    // module객체에 module.exports.first 가 할당됩니다.
    firstProperty(module.exports, module);
    
    // 그리고 이 module.exports 값, 즉 { first } 객체를 반환합니다.
    return module.exports;
  }

  return __require
}
```

이런 방식으로 `__commonJS` 함수로 CJS 코드를 감싸고 그 내부에서 `module` 객체에 할당하는 부분을 가로채서 그 값을 반환하도록 처리합니다.


<br />

## 그렇다면 동적 require의 경우에는 어떻게 할까?

다음과 같이 랜덤하게 동적으로 `lodash.first`와 `lodash.last`를 불러오는 `myPackage`를 작성하고 main.js에서 이를 불러오도록 했습니다.

```js
// myPacakge
const firstOrLast = (arr) => {
  return Math.random() > 0.5 ? require('lodash.first')(arr) : require('lodash.last')(arr)
}

module.exports = firstOrLast
```

```js
// main.js
import firstOrLast from "myPackage"

console.log('Hello World!')
console.log(firstOrLast([1, 2, 3]))
```

그 결과 그냥 `lodash.first`와 `lodash.last`를 모두 `__commonJS` 함수로 래핑하고 ESM 번들에 포함시킨 `myPacakge` 파일이 내려왔습니다.

```js
// /node_modules/.vite/deps/myPackage_index__js.js?v=3016a681
var require_lodash_first = __commonJS({
  "node_modules/lodash.first/index.js"(exports, module) {
    function first(array) {
      return array ? array[0] : void 0;
    }
    module.exports = first;
  }
});

var require_lodash_last = __commonJS({
  "node_modules/lodash.last/index.js"(exports, module) {
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : void 0;
    }
    module.exports = last;
  }
});

var require_myPackage = __commonJS({
  "node_modules/myPackage/index.js"(exports, module) {
    var first = require_lodash_first();
    var last = require_lodash_last();
    var firstOrLast = (arr) => {
      return Math.random() > 0.5 ? first(arr) : last(arr);
    };
    module.exports = firstOrLast;
  }
});

export default require_myPackage();
```

<br />

## 결론

- Vite는 CJS로 작성된 코드를 ESM 방식으로 변환합니다.
- 이 때 import나 require 같은 모듈 선언 코드 자체를 바꾸는 게 아니라, 그냥 `__commonJS`라는 래퍼 함수를 만들고 그 내부에 CJS 코드를 위치시켜 `module` 객체를 가로채서 값을 획득하는 방식으로 동작합니다.
- 아울러 동적 require의 경우에는 똑같이 모든 케이스의 코드를 `__commonJS`로 감싸고 하나의 파일로 번들링해서 내려줍니다.

<br /><br /><br />
