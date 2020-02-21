---
title:  "「JavaScript」 필수 개념"
date: 2020-01-14
tag: ["Posts"]
---
  
  
  
  
순서  
  
1. let, var, const
2. Scope
3. 함수: 선언식과 표현식, 그리고 함수의 scope
4. function vs Arrow function
5. Template literal
6. 객체(object)
7. 배열(array)
8. Destructuring
9. forEach, map, filter, reduce (고차 함수)
10. DOM이란 무엇인가?

<br><br><br><br><br>

## 1. <strong>let, var, const</strong>  
  
let, var, const 는 모두 선언을 위해 사용되는 것이다. 그 중에서도 <strong>let과 var는 변수</strong> 선언에 사용되는 것이며,
<strong>const는 상수</strong> 선언에 사용되는 것이다.  
 
<strong>let과 var</strong>은 선언된 블록과 그 하위 블록에서만 유효하다. 하지만 var의 경우 프로그램이나 함수 최상위에서 전역변수로 사용할 수 있다는 점에서 let과 다르다고 할 수 있다. 하지만 근래에는 var의 사용을 지양하고 let을 보편적으로 쓰는 경향이 있다.  
<strong>const</strong>는 상수 선언에 사용되어 초기값을 다시 다른 값으로 변경할 수 없다는 점이 중요하다. 주의해야 할 점은 초기값을 선언과 동시에 반드시 지정해줘야 한다는 것이다.
      
아래 코드를 살펴보면 let, var, const에 대해서 쉽게 이해할 수 있다.  
  
```javascript
var a = 1;
var b = 2;
const SANG_SOO = 3;  // 선언과 동시에 초기화

SANG_SOO = 10;  // 상수를 재선언 하려는 시도는 에러 발생시킴
var SANG_SOO;  // 이미 SANG_SOO라는 const 선언을 했으므로 같은 이름 선언 불가능

if (a === 1) {
 var a = 11; // 전역 변수 - 값을 변경할 수 있음
 let b = 22; // if 블록에 생성한 새로운 변수
 let SANG_SOO = 20; //  블록 안이기 때문에 위에 선언한 const와 상관 없음
 var SANG_SOO = 20; //  var를 사용하면 전역적으로 호이스트 되고 에러가 발생

 console.log(a);  // 11 - 값이 변경되었음
 console.log(b);  // 22 - if 블록의 b이므로 값으로 22 출력
}

console.log(a); // 11 - 전역 변수이기 때문에 if 블록에서 변경한 사항이 그대로 적용됨
console.log(b); // 2 - if 블록에서의 b와는 별개의 변수이기 var 변수의 b 값 출력
```

---

<br><br><br><br><br>

## 2. <strong>Scope</strong>  
  
scope란 어떤 변수들에 접근할 수 있는 지를 정의하는 것으로 전역scope와 지역scope로 나뉜다.  
  
먼저 <strong>전역scope</strong>에 대해 살펴보면,  
변수가 함수나 중괄호({})의 바깥에 선언되었다면, 이를 전역scope에 정의되었다고 한다.  
그리고 이 변수는 코드의 모든 곳에서 사용 가능하다.  
예를 들면 아래 코드와 같다.  
  
```javascript
const hello = 'Hello'
function sayHello () {
 console.log(hello)
}
console.log(hello) // 'Hello'
sayHello() // 'Hello'
```  
  
다음으로 <strong>지역scope</strong>에 대해 살펴보면,  
변수가 함수나 중괄호({})의 안에서 선언되었다면, 이를 지역scope에 정의되었다고 한다.  
그리고 이 변수는 함수나 중괄호 내에서만 사용 가능하다.  
예를 들면 아래 코드와 같다.  

```javascript
function sayHello () {
 const hello = 'Hello CSS-Tricks Reader!'
 console.log(hello)
}
sayHello() // 'Hello CSS-Tricks Reader!'
console.log(hello) // Error, hello is not defined
```

---

<br><br><br><br><br>

## 3. <strong>함수</strong>  
## : 선언식과 표현식, 그리고 함수의 scope  
  
함수선언식  
  
```javascript
function name(param) {
  statements;
}
```
  
함수표현식  

```javascript
let myfunction = function(param) {
  statements;
};
```
  
위에서 함수선언식과 함수표현식 모두 name은 함수 이름, param은 함수로 전달되는 argument의 이름, 그리고 statements는 함수의 내용을 의미한다.  
함수선언식은 일반적인 프로그래밍 언어에서의 함수 선언이라고 볼 수 있으며,  
함수표현식은 변수값에 함수 표현을 담아놓은 형태라고 볼 수 있다.  
  
그렇다면 함수선언식과 함수표현식의 차이점은 무엇이 있을까?  
차이점은 바로 호이스팅이다.  
즉, 함수선언식은 그 선언을 둘러싼 함수의 최상부나 전역 범위로 끌어올려질 수 있다. 하지만 함수표현식은 불가능하다.  
아래 코드는 이에 대한 예시이다.  
  
```javascript
hoisted(); // logs "foo"
notHoisted(); // TypeError: notHoisted is not a function

function hoisted() {
 console.log("foo");
}
let notHoisted = function() {
 console.log("bar");
};
```  

그렇기 때문에 함수를 표현식으로 작성할 경우, 이를 호이스팅 하지 않도록 주의해야한다.  
추가적으로 함수는 서로의 scope에 접근할 수 없기 때문에 아래 코드와 같은 실수를 저지르지 않도록 주의해야 한다.  
  
```javascript
function first () {
 const firstFunc= 'I’m part of first'
}
function second () {
 first()
 console.log(firstFunc) // Error, firstFunc is not defined
}
```  
  
또한, 함수가 어떠한 함수의 내부에서 정의되었다면, 내부 함수는 외부 함수의 변수에 접근할 수 있으나 외부 함수에서 내부함수로
접근하는 것은 불가능 하므로 이 역시 주의해야 한다. (내부 -> 외부 변수 참조 가능)  
아래는 이에 대한 코드이다.  
  
```javascript
function outerFunction ()  {
 const outer = 'I’m the outer function!'

 function innerFunction() { // 내부함수 정의
  const inner = 'I’m the inner function!'
  console.log(outer) // I’m the outer function! // 내부함수 -> 외부함수 변수 접근 가능
 }

 console.log(inner) // Error. 외부함수 -> 내부함수 변수 접근 <strong>불가능</strong>
}
```

---

<br><br><br><br><br>

## 4. [function] vs <strong>[Arrow function]</strong>  
  
화살표 함수(arrow function)의 구문  

```javascript  
(param) => { statements }  
```
  
param은 함수에 전달 될 매개변수 값을 의미하며, statements는 함수의 내용을 담는 부분이다.  
  
화살표 함수의 특징은 다음과 같으며, 이러한 특징들이 화살표 함수의 도입에 영향을 주었다.  
  
1. 위의 화살표 함수의 구문을 보면 알 수 있듯이, 짧고 간결하며 직관적인 함수를 작성할 수 있다.  
2. <strong>this와 argument를 바인딩 하지 않는다.</strong>
   여기서 바인딩하지 않는다는 의미는, 화살표 함수 안에 this는 언제나 상위 스코프의 this를 가리킨다는 것이다.  
   즉, 기존 함수에서 this는 기본적으로 전역객체(window or global)로 바인딩 되었기 때문에, 이러한 현상을 방지하고자 새로운 변수를 선언하여 여기에 this를 저장하여 해결하거나, map(func, this)를 이용하거나, Function.prototype.bind()를 이용하여 this를 바인딩했다.  
   하지만 화살표함수를 사용하면 이러한 복잡한 과정 없이 바인딩하지 않도록 할 수 있어서 유용하다.  
3. 화살표 함수는 익명 함수로만 사용할 수 있다. 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다.  
4. 마지막으로 화살표함수에있어서 주의해야 할 점은 메소드가 아닌 함수에서 사용하는 것이 적절하다는 것이다.  
  
---

<br><br><br><br><br>

## 5. <strong>Template literal</strong>  
  
템플릿 리터럴(template literal)이란 문자열을 작성함에 있어 기존에 사용하던 '일반적인 문자열(ES6 이전)'보다 쉽게 작성할 수 있도록 하는 도구이다.  
템플릿 리터럴은 ""(큰따옴표)나 ''(작은따옴표)가 아닌 ``(백틱)(키보드 상 숫자1 왼쪽에 존재)을 사용한다.  
'일반적인 문자열'에서 줄바꿈은 허용되지 않으며 공백(white-space)를 표현하기 위해서는 백슬래시(\)로 시작하는 이스케이프 시퀀스(Escape Sequence)를 사용하여야 했다. 하지만 템플릿 리터럴을 사용하면, '일반적인 문자열'과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 white-space는 있는 그대로 적용된다.  
그리고 템플릿 리터럴은 "+" 연산자를 사용하지 않아도 문자열 인터폴레이션(String Interpolation)을 이용하여 간단한 방법으로 새로운 문자열을 삽입할 수 있다. 여기서 문자열 인터폴레이션은 <strong>${표현식}</strong> 으로 사용된다.  
아래 예제를 보면 위의 설명들을 모두 쉽게 이해할 수 있으며, 템플릿 리터럴의 유용성을 알 수 있다.  
  
```javascript
const first = 'Ung-mo';
const last = 'Lee';

// ES5: 문자열 연결
console.log('My name is ' + first + ' ' + last + '.');
// 출력: "My name is Ung-mo Lee."

// ES6: 템플릿 리터럴을 이용한 문자열 연결
console.log(`My name is ${first} ${last}.`);
// 출력: "My name is Ung-mo Lee."

// ES6: 문자열 인터폴레이션
console.log(`1 + 1 = ${1 + 1}');
// 출력: 1 + 1 = 2
```

---

<br><br><br><br><br>

## 6. <strong>객체(object)</strong>  
  
JavaScript에서 객체란 키(key)와 값(value)으로 구성된 프로퍼티(property)들의 집합을 의미한다. 그리고 메소드란 프로퍼티가 함수인 것을 의미한다.  
  
아래의 예제 코드를 보면 객체, 그리고 프로퍼티와 메소드를 쉽게 이해할 수 있다.  

```javascript
let person = {
 name: 'Lee', // 프로퍼티 - 키(key): 값(value)
 gender: 'male', // 프로퍼티
 sayHello: function () { // 프로퍼티인데 함수형식 = 메소드
  console.log('Hi! My name is ' + this.name);
 }
};
```

위의 예제 코드는 가장 일반적인 객체 생성 방식을 보여준다.  
그리고 객체 생성 방식에는 아래 코드와 같은 방식도 있는데, 이를 Object 생성자 함수라고 한다.  
이는 new 연산자와 object 생성자 함수를 호출하여 빈 객체를 생성하고, 여기에 프로퍼티와 메소드를 추가하는 방식이다.  

```javascript
let person = new Object(); // 빈 객체의 생성

person.name = 'Lee'; // 프로퍼티 추가
person.gender = 'male'; // 프로퍼티 추가
person.sayHello = function () { // 메소드 추가
 console.log('Hi! My name is ' + this.name);
};
```

그렇다면 만약 같은 프로퍼티들을 가진 여러 개의 객체를 생성하려면 어떻게 해야할까? 아래 예제 코드와 같이 작성한 객체생성 코드를 복사-붙여넣기를 해야할까?  

```javascript
let person1 = {
 name: 'Lee',
 gender: 'male',
 sayHello: function () {
  console.log('Hi! My name is ' + this.name);
 }
};

let person2 = {
 name: 'Kim',
 gender: 'female',
 sayHello: function () {
  console.log('Hi! My name is ' + this.name);
 }
};
```

이러한 과정은 너무 지루하고 지저분하다. 그렇기 때문에 이를 쉽게 할 수 있도록 하는 것이 존재하는데, 바로 <strong>생성자 함수</strong>이다.
아래 예제 코드는 생성자 함수에 대한 것이다.  

```javascript
// 생성자 함수
function Person(name, gender) {
 let goog = true; // this에 연결되있지 않은 변수
 this.name = name;
 this.gender = gender;
 this.sayHello = function(){
  console.log('Hi! My name is ' + this.name);
 }
};

// 인스턴스의 생성
let person1 = new Person('Lee', 'male');
let person2 = new Person('Kim', 'female');
```

생성자 함수는 함수명을 일반적으로 대문자로 시작하며, 프로퍼티들 앞에 존재하는 this는 생성자 함수 코드 아래에 생성할 인스턴스들을 가리키게 된다.  
즉, this가 하는 역할이란, 인스턴스를 생성하면 생성자 함수의 프로퍼티들이 알아서 그 인스턴스를 가리킬 수 있도록 하는 장치인 것이다.  
또한, 위 예제코드에서 name과 gender, sayHello와 같이 this와 연결된 프로퍼티들은 외부에서 참조가 가능하지만, goog와 같이 생성자함수 내에서 this의 연결없이 선언된 변수는 외부에서 참조가 불가능하다는 점을 주의해야한다.  

---

<br><br><br><br><br>

## 7. <strong>배열(array)</strong>  
  
JavaScript 배열은 한 개의 변수에 여러 개의 값을 순차적으로 저장하는데 사용되는 것이다.  
아래는 배열의 내용을 쉽게 자르고 붙이고 뽑아낼 수 있는 문법 사항들이다.  

```javascript  
let arr = { 'apple', 'banana'}; // 배열 생성: apple banana

let example1 = arr.push('orange'); // 배열 끝에 항목 추가:  apple banana orange
let example2 = arr.pop(); // 배열 끝에 있는 항목 제거: apple banana
let example3 = arr.shift(); // 배열 맨 앞에 있는 항목 제거: banana
let example4 = arr.unshift('melon'); // 배열 맨 앞에 항목 추가: melon banana
let example5 = arr.indexOf('banana'); // 배열에서 해당되는 항목의 인덱스 찾기: 1
let example6 = arr.push('orange'); // melon banana orange
let example7 = arr.splice(1, 2); // 인덱스 1에서부터 2개만큼 제거: melon
let example8 = arr.slice(i, j); // 인덱스 i에서부터 인덱스 j 전까지 제거
```

cf) slice와 splice의 차이: slice는 원본 배열은 건들이지 않지만, splice는 원본의 요소도 제거시킨다.

---

<br><br><br><br><br>

## 8. <strong>Destructuring</strong>  
  
디스트럭처링(Destructuring)은 구조화된 배열 또는 객체를 Destructuring(비구조화 -> 파괴)하여 개별적인 변수에 할당하는 것이다. 배열 또는 객체 리터럴에서 필요한 값만을 추출하여 변수에 할당하거나 반환할 때 유용하다.  
배열을 디스트럭처링 하는 것과, 객체를 디스트럭처링 하는 것에 대한 다양한 예시가 존재하는데, 모두 포스팅하는 것보다는 링크를 거는 것이 효율적일것 같아 관련 링크를 첨부한다.  
[디스트럭처링 - Poiema web]  
<https://poiemaweb.com/es6-destructuring>  
[디스트러처링 - MDN] <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment>

---

<br><br><br><br><br>

## 9. <strong>forEach, map, filter, reduce </strong>  
  
<strong>forEach</strong>  
forEach 메소드는 배열을 순회하며 각 배열의 요소에 대해 인자로 주어진 콜백함수를 실행한다. 그리고 코드를 보았을 때 직관적으로 코드의 내용을 알 수 있다는 장점이 있다.  
아래는 forEach의 예제 코드이다.  

```javascript
const numbers = [1, 2, 3];
let pows = [];

// case 1: for 문으로 순회
for (let i = 0; i < numbers.length; i++) {
 pows.push(numbers[i] ** 2);
}

// case 2: forEach 메소드로 순회
numbers.forEach(item => pows.push(item ** 2));

// 두 가지 경우 모두 같은 결과값을 출력한다: [ 1, 4, 9 ]
```  
  
<strong>map</strong>  
배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수의 return 값으로 새로운 배열을 생성하여 반환한다.  
  
<strong>filter</strong>  
배열을 순회하며 각 요소에 대하여 인자로 주어진 콜백함수의 실행 결과가 true인 배열 요소의 값만을 추출한 새로운 배열을 반환한다.  
  
아래는 map과 filter의 에제 코드이다.  

```javascript
const number = [1, 2, 3, 4, 5];

const examplefilter = number.filter(item => item % 2 == 0);
// 밑줄 친 부분이 조건 식. 이 조건에서 1(true)을 만족하는 것만 새로운 배열에 넣음
const examplemap = number.map(item => item * 2);
// 밑줄 친 부분으로 각 인수를 바꿔서 새로운 배열에 넣음

console.log(examplefilter); // filter 적용된 값 출력
console.log(examplemap);  // map 적용된 값 출력
```  
  
<strong>reduce</strong>
배열을 순회하며 각 요소에 대하여 이전의 콜백함수 실행 반환값을 전달하여 콜백함수를 실행하고 그 결과를 반환한다. 즉, return 한 값을 previousValue 값에 넣고 다시 다음 배열요소로 넘어가서 다시 함수를 실행하는 것이라고 보면 된다.  
구문은 아래와 같다.  
const result = arr.reduce((previousValue, currentValue, currentIndex, self) => {  
  statements;  
})  
  
아래는 reduce의 예제 코드이다.  

```javascript
// arr의 값을 모두 더한 값을 출력하는 예제
const arr = {1, 2, 3, 4, 5};

const totalsum = arr.reduce((pre, cur) => {
 return pre + cur; // pre 값에 pre + cur 값을 넣는 것임
});

console.log(totalsum); // 15 출력
  

// arr에서 가장 큰 값을 출력하는 예제
const arr = [1, 13, 5, 26, 8, 10, 13];

const big = arr.reduce((pre, cur) => {
 if(pre < cur) {
  return cur;
 } else {
  return pre;
 }
});

console.log(big); // 26 출력
```

---

<br><br><br><br><br>

## 10. <strong>DOM</strong>  
  
텍스트 파일로 만들어져 있는 웹 문서를 브라우저에 렌더링하려면 웹 문서를 브라우저가 이해할 수 있는 구조로 메모리에 올려야 한다.  
브라우저의 렌더링 엔진은  
웹 문서를 로드 -> 파싱하여 웹 문서를 브라우저가 이해할 수 있는 구조로 구성  
-> 메모리에 적재  
이러한 과정을 하는 것을 DOM이라 한다.  
![dom](https://poiemaweb.com/img/client-server.png)  
즉 모든 요소와 요소의 어트리뷰트, 텍스트를 각각의 객체로 만들고 이들 객체를 부자 관계를 표현할 수 있는 트리 구조로 구성한 것이 DOM이다. 이 DOM은 자바스크립트를 통해 동적으로 변경할 수 있으며 변경된 DOM은 렌더링에 반영된다.  

---
