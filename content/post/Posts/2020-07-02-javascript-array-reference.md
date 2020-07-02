---
title: "[JavaScript] 이차원배열의 복사는 어떻게 할까?"
date: 2020-07-01
tag: ["Posts"]
---

## 1차원 배열의 복사

보통 1차원 배열의 복사는 slice() 메서드를 사용한다.

  ```javascript
  const arr = [1, 2, 3, 4];

  const copy = arr.slice();
  ```

<br><br>

## 그렇다면 2차원 배열의 복사는 어떻게 할까?

1차원 배열에서 했던 것처럼 slice() 메서드를 사용하면 되지 않을까?

  ```javascript
  const arr = [[0, 0], [0, 0], [0, 0]];
  
  const copy = arr.slice();

  copy[1][1] = 1;
  console.log(copy); // [[0, 0], [0, 1], [0, 0]]
  console.log(arr); // [[0, 0], [0, 1], [0, 0]]
  ```

분명 우리는 arr을 복사했는데 copy에서 값을 변경하니까 arr의 원소도 변경되었다. 왜 안되는 것일까?  
이유는 배열의 주소 참조 때문이다.  
2차원 배열은 사실상 [@aaaa0, @aaaa1, @aaaa2] 처럼 배열 안에 배열의 주소를 참조하고 있기 때문에 arr.slice()만으로는 @aaaa0, @aaaa1, @aaaa2 배열의 참조를 그대로 이어가게 된다.

<br><br>

## 2차원 배열을 복사하는 방법

사실 똑같이 slice() 메서드를 사용해주면 된다. 대신 각 원소들에 대해서도 해주어야 한다. 즉, 각 원소들에 대해서도 해주고, 2차원 배열 그자체에 대해서도 해주어야 한다.

  ```javascript
  const arr = [[0, 0], [0, 0], [0, 0]];

  const copy = arr.map(v => v.slice());

  copy[1][1] = 1;
  console.log(copy); // [[0, 0], [0, 1], [0, 0]]
  console.log(arr); // [[0, 0], [0, 0], [0, 0]]
  ```

  map() 메서드를 통해 2차원 배열 자체에 대해 복사를 해주었고, v.slice()를 통해 각 원소들에 대해서도 복사를 해주었다.

<br><br>

## 3차원 배열은?

똑같이 복사를 3번의 깊이로 해주면 되지 않을까!

<br><br>