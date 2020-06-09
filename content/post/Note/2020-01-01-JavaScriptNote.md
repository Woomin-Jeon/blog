---
title: "Note - JavaScript"
date: 2020-01-01
tag: ["Note"]
---

#### sort 메서드에 대한 조금 더 깊은 이해

- 배열 arr = [2, 3, 1, 5, 4] 가 있다고 가정하자.
- arr.sort((a, b) => a - b)는 배열 arr을 오름차순 [1, 2, 3, 4, 5]로 만든다.
- 이 과정을 깊게 살펴보면, 먼저 sort가 처음 돌때, (a, b)는 (2, 3)을 의미한다. a=2, b=3. 그리고 함수의 내용이 1보다 크면 (a, b)를 (b,a로 바꿔주는 역할을 하는 것이 sort이다.
- 즉, 2 - 3 = -1로 1보다 작기때문에 (a, b)의 위치는 바뀌지 않는다.
- 다음으로 sort가 돌면, 다시 처음부터 (2, 3)에 대해 판단을 하고 위의 경우에서 보았듯이 자리는 그대로 놥둔다. 이제 (a, b)는 (3, 1이된다. 3 - 1은 2이므로 1보다 크기 때문에 (a, b)의 위치는 (b, a)로 바뀌어서 이 시점에서의 arr은 [2, 1, 3, 5, 4]가 된다.
- 이제 다시 또 다음으로 sort가 돌면, 처음의 (2, 1)에 대해 이 두 수는 1보다 큰 값을 반환하므로 자리가 바뀌고 [1, 2, 3, 5, 4]가 된다.
- 이제 다시 또 다음으로 sort가 돌면, 배열 arr의 앞의 [1, 2, 3] 은 위의 경우처럼 넘어가고 (3, 5)에 대한 판단을 한다.
- 이런식으로 sort는 계속 배열 arr을 돌면서 원소들을 정렬한다.
- 그러므로, arr.sort((a, b) => "함수의 내용") 으로 함수의 내용을 우리가 만들고 그 반환값을 1, -1, 0 으로 정해줌으로써 조건에따른sort를 가능하게 한다. 아래는 이에대한 예시이다.

    ```javascript
    failureRate = failureRate.map((v, i) => v = { rate: v, index: i+1 });
    failureRate.sort((a, b) => {
      return a.rate > b.rate ? -1 :
      a.rate < b.rate ? 1 :
      a.rate == b.rate ?
        a.index < b.index ? -1 :
        a.index > b.index ? 1 : 0 :
      0;
    });
    ```

<br />

#### 숫자 합치기  

  JavaScript에서 여러 숫자를 하나로 합치는 방법은, 10 + ‘’ + 5 = “105” 이것과 같이 하면 된다.  
  그리고 이걸 다시 숫자로 바꾸려면, +(10 + ‘’ + 5) = 105 로 하면 된다.

<br />

#### 함수에서 발생하는 에러를 해결하기 위한 5가지 step  

  1. 함수 안에 들어가는 x 값에 문제는 없는가
  2. 함수에 x 값이 제대로 잘 들어갔는가
  3. 함수 안에서 x 값이 잘 처리되고 있는가
  4. 함수를 통해 처리된 x 값의 결과물 y가 함수 바깥으로 나오는 과정에 문제는 없는가
  5. 결과물 y가 제대로 잘 return 되었는가


<br />

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

<br />

#### substr 메서드  

  String.substr(a, b) 문자열 추출 메서드. 인덱스 a에서부터 b개 만큼 잘라서 반환.

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  arr.substr(1,3) -> [2, 3, 4]
  ```

<br />

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

<br />
  
#### 10진수 x를 y진수로 바꾸는 법 : x.toString(y)  

  예를 들어, 10진수 5를 3진수로 바꾸려면,

  ```javascript
  const value = 5;
  const changedNum = value.toString(3)
  console.log(changedNum) -> "12"
  ```

<br />

#### x진수로 쓰여진 value가 10진수로 얼마인지 판단하는 법 : parseInt(value, x)  

  예를 들어 2진수로 쓰여진 1010을 10진수로 보려면,

  ```javascript
  const value = 1010;
  const changedNum = parseInt(value, 2);
  console.log(changedNum) -> 10
  ```

<br />

#### 문자를 아스키코드로, 아스키코드를 문자로 변환하는 메서드  
  
  ```javascript
  const a = "a";
  
  // character → ASCII
  a.charCodeAt(0) -> 97

  // ASCII → character
  String.fromCharCode(97) -> "a"
  ```

<br />

#### 자릿수를 맞춰주는 메서드 : padStart()

```javascript
const num = '1';
num.padStart(3, '0') -> '001'
num.padStart(4, '*') -> '***1'
```

<br />

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

<br />

#### 배열에서 가장 큰 값을 찾는 법

  ```javascript
  const arr = [1, 2, 3, 4, 5];
  Math.max(...arr) -> 5
  ```

<br />

#### 부분 집합인지를 판별하는 법

  ```javascript
  const arr = [1, 2, 3, 4, 5, 6];
  const subArr = [1, 3, 4];

  /* subArr이 arr의 부분집합인지를 확인하는 방법으로
     그동안에는 every와 includes를 이용했었다. */
  subArr.every(v => arr.includes(v));
  
  /* 하지만 이렇게되면 subArr를 순회하며(every), arr도 순회하기 때문에(includes)
     복잡도가 O(n^2)이 나온다. 그렇기 때문에 효율 좋은 방법을 생각해보았다.
     그리고 includes라는 메서드가 문자열에서 해당 문자열이 포함하는 지를 살펴보는
     것이라는 걸 이용하여, 다음과 같이 부분집합인지를 구한다. */
  arr.toString().includes(subArr.toString());
  ```
