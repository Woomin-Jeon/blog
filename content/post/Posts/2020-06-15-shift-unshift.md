---
title: "[JavaScript] 배열의 특징 (shift, unshift의 효율성에 대한 제고)"
date: 2020-06-16
tag: ["Posts"]
---

## shift와 unshift의 좋지 않은 효율성

100,000개의 데이터를 push, pop, shift, unshift로 처리했을 때의 처리 시간을 보자.

<br>

#### push

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = [];

    for (let i = 0; i < time; i += 1) {
      const char = arr.push(0);
    }
  }
  ```

#### pop

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = Array(time).fill(0);

    for (let i = 0; i < time; i += 1) {
      const char = arr.pop();
    }
  }
  ```

#### shift

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = Array(time).fill(0);

    for (let i = 0; i < time; i += 1) {
      const char = arr.shift();
    }
  }
  ```

#### unshift

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = [];

    for (let i = 0; i < time; i += 1) {
      const char = arr.unshift(0);
    }
  }
  ```

<br><br><br>

## 결과

|  push  |   pop  |    shift  |  unshift  |
|--------|--------|-----------|-----------|
| 6.94ms | 6.52ms | 3727.17ms | 2838.66ms |
| 6.74ms | 7.03ms | 3643.37ms | 2832.25ms |
| 7.15ms | 6.87ms | 3633.24ms | 2832.80ms |
| 6.19ms | 7.18ms | 3630.10ms | 2697.41ms |
| 6.86ms | 7.03ms | 3545.95ms | 2833.13ms |

<br><br><br>

## 왜 shift와 unshift는 효율이 좋지 않을까?

JavaScript의 배열은 사실 객체이기 때문에, 지금까지 우리는 배열처럼 사용할 수도 있었고, 리스트처럼 사용할 수도 있었다. 다음과 같은 것들이 가능했다.

  ```javascript
  // 빈 배열 선언
  const arr = [];

  // 뒤에서 집어넣기
  arr.push(1);

  // 뒤에 것을 제거하기
  arr.pop();

  // 앞에서 집어넣기
  arr.unshift();

  // 앞에 것을 제거하기
  arr.shift();

  // 타입에 상관없이 배열에 넣기
  const arr = [1, "apple", { value: 3, key: 4 }, [1, 2, 3]];

  // 인덱스로 값에 접근하기
  console.log(arr[1]);
  ```

이처럼 JavaScript에서의 배열은 배열로서의 특징과 리스트로서의 특징을 모두 가지고 있었기 때문에, push, pop, shift, unshift 메서드 모두 링크드 리스트를 생각하고 노드를 제거한 뒤 앞의 노드와 뒤의 노드를 연결하는 방식으로 작동하는 줄 알았다. 이게 끝인줄 알았다. 그렇다면 도대체 왜 shift와 unshift는 효율이 좋지 않은 것일까? 이를 알기 위해서는 먼저 JavaScript에서의 배열이 메모리 상에서 어떻게 존재하는지를 알아야 한다.

<br><br><br>

## 밀집 배열(dense array)과 희소 배열(sparse array)

일반적으로 배열이라는 자료 구조의 개념은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료 구조를 말한다. 즉, 배열의 요소는 하나의 타입으로 통일되어 있으며 서로 연속적으로 인접해 있다. 이러한 일반적인 배열을 `밀집 배열(dense array)`이라 한다. C나 Java에서의 배열이 이와 같다.  
밀집 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열되어있기 때문에 메모리의 주소값과 인덱스만 알면 한번에 원하는 요소에 접근할 수 있다. 예를 들어 메모리 주소가 1000 이고, 배열의 요소의 크기가 4byte인 배열에서 인덱스를 기준으로 특정 요소를 찾으면, 1000 + 4(byte) * 2(index) = 1008. 즉, 위 배열의 인덱스 2인 요소의 메모리주소는 1008이 된다. 이처럼 배열은 인덱스를 통해 효율적으로 요소에 접근할 수 있다는 장점이 있다.  
하지만 배열의 사이사이에 요소를 삽입하거나 삭제하려고 하는 경우에는 요소들을 이동시켜줘야 한다는 단점이 있다. 예를 들어, 중간에 삽입을 하게되면 그 뒤의 배열 요소들을 모두 한 칸씩 밀어주어야 하며, 반대로 제거를 하는 경우에는 한 칸씩 당겨주어야 한다. 이는 배열의 거의 모든 요소들에 영향을 미치므로 효율성이 좋지 않다.  
  
하지만 JavaScript의 배열은 일반적인 의미의 배열과 다르다. 즉, 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며 연속적으로 이어져 있지 않고 뒤죽박죽으로 되어있다(리스트 형태). 이와 같이 배열의 요소가 연속적으로 이어져 있지 않는 배열을 `희소 배열(sparse array)`이라 한다.  
JavaScript 같은 희소 배열이 밀집배열에 비해 가지고 있는 장점은 삽입과 제거의 연산이 더 빠르게 가능하다는 것이다. 중간중간 메모리가 비어있기 때문에 그 사이에 삽입을 하거나 제거를 하므로써 다른 요소들을 건드리지 않고 수행할 수 있다.  
즉, JavaScript의 배열은 일반적인 배열의 동작을 흉내낸, index와 length를 프로퍼티로 가지고 있는 특수한 객체이다. 그렇기 때문에 `JavaScript 배열의 index는 메모리를 참조하기 위해 사용되는 것이 아니라 단지 데이터의 "순서"를 보장하는 프로퍼티일 뿐`이다.

<br><br><br>

## 결론

그래서 shift와 unshift의 효율이 좋지 않은 이유는, 이 두 메서드는 배열의 앞부분에 동작하는 메서드로 index의 변화를 유발하기 때문이다. push, pop 같은 경우는 배열의 맨 마지막에 동작하므로 다른 요소들의 index 변화가 없지만, shift와 unshift는 다른 요소들의 index를 하나씩 줄여주거나 하나씩 늘려주는 연산이 추가적으로 필요해진다. 즉, 순서를 보장하기 위해 배열을 순회하면서 나머지 요소들의 index 프로퍼티에도 연산을 수행해주어야 하기때문에 느려지는 문제가 발생하는 것이다. 하지만 이럼에도 불구하고 JavaScript의 배열은 희소 배열이기 때문에 일반 밀집 배열들에 비해 삽입과 제거의 연산이 빠른 편이다( index를 통해 배열 요소에 직접 접근하는 방법은 일반 밀집 배열에 비해 조금 느린 편이다).
