---
title: "Note - JavaScript"
date: 2020-01-01
tag: ["Note"]
---

#### 문자열의 sort

  ```javascript
  const arr = [
    { index: 0, name: "bbb" },
    { index: 1, name: "ddd" },
    { index: 2, name: "ccc" },
    { index: 3, name: "eee" },
    { index: 4, name: "aaa" },
    { index: 5, name: "fff" },
  ];
  ```

  이런 배열을 name을 기준으로 정렬하려면 어떻게 해야할까?

  ```javascript
  // 첫번째 방법
  arr.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
  });

  // 두번째 방법
  arr.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  ```

  두번째 방법이 훨씬 가독성이 좋다. 앞으로는 localeCompare() 메서드를 적극 활용하도록 하자.  
  (참고로 효율은 첫번째 방법이 더 좋다)

<br>

#### 숫자 합치기  

  JavaScript에서 여러 숫자를 하나로 합치는 방법은, 10 + ‘’ + 5 = “105” 이것과 같이 하면 된다.  
  그리고 이걸 다시 숫자로 바꾸려면, +(10 + ‘’ + 5) = 105 로 하면 된다.

<br>

#### 함수에서 발생하는 에러를 해결하기 위한 5가지 step  

  1. 함수 안에 들어가는 x 값에 문제는 없는가
  2. 함수에 x 값이 제대로 잘 들어갔는가
  3. 함수 안에서 x 값이 잘 처리되고 있는가
  4. 함수를 통해 처리된 x 값의 결과물 y가 함수 바깥으로 나오는 과정에 문제는 없는가
  5. 결과물 y가 제대로 잘 return 되었는가


<br>

#### JavaScript 객체 프로퍼티 추출과 관련된 메서드  
  
  ```javascript
  const example = {
    id: 'woomin',
    sex: 'male',
    contents: 'what'
  }

  Object.entries(example)  
    -> "id: woomin", "sex: male", "contents: what"
  Object.keys(example)
    -> ["id", "sex", "contents"]
  Object.values(example)
    -> ["woomin", "male", "what"]
  ```

<br>

#### substr 메서드  

  String.substr(a, b) 문자열 추출 메서드. 인덱스 a에서부터 b개 만큼 잘라서 반환.

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  arr.substr(1,3) -> [2, 3, 4]
  ```

<br>

#### 삼항연산자와 "&&"  
  
  ```javascript
  const a = 1;
  const b = 2;
  const answer = [];

  // 만약 a가 b보다 작은 경우 answer배열에 그 값을 넣고 싶다면,
  a < b ? answer.push(a) : ''; // 참일 경우 a값을 삽입, 아닐경우 아무 값 반환.
  // 하지만 이렇게 하는 것보다 논리연산자 "&&"을 사용하는 것이 더 명시적이다.
  a < b && answer.push(a);
  ```

<br>
  
#### 10진수 x를 y진수로 바꾸는 법 : x.toString(y)  

  예를 들어, 10진수 5를 3진수로 바꾸려면,

  ```javascript
  const value = 5;
  const changedNum = value.toString(3)
  console.log(changedNum) -> "12"
  ```

<br>

#### x진수로 쓰여진 value가 10진수로 얼마인지 판단하는 법 : parseInt(value, x)  

  예를 들어 2진수로 쓰여진 1010을 10진수로 보려면,

  ```javascript
  const value = 1010;
  const changedNum = parseInt(value, 2);
  console.log(changedNum) -> 10
  ```

<br>

#### 문자를 아스키코드로, 아스키코드를 문자로 변환하는 메서드  
  
  ```javascript
  const a = "a";
  
  // character → ASCII
  a.charCodeAt(0) -> 97

  // ASCII → character
  String.fromCharCode(97) -> "a"
  ```

<br>

#### Map 객체

  ```javascript
  const map = new Map();
  const id = 'userID';
  let name;

  name = 'apple';
  map.set(id, name); -> userID: 'apple'

  name = 'banana';
  map.set(id, name); -> userID: 'banana;

  map.get(id) -> 'banana'
  ```

<br>

#### 부분 집합인지를 판별하는 법

  ```javascript
  const arr = [1, 2, 3, 4, 5, 6];
  const subArr = [1, 3, 4];

  subArr.every(v => arr.includes(v));
  ```
