---
title: "[JavaScript] push, pop, shift, unshift의 효율성에 대한 제고" 
date: 2020-06-16
tag: ["Posts"]
---

100,000개의 데이터를 push, pop, shift, unshift로 처리했을 때의 처리 시간을 보면,

### push

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = [];

    for (let i = 0; i < time; i += 1) {
      const char = arr.push(0);
    }
  }
  ```

### pop

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = Array(time).fill(0);

    for (let i = 0; i < time; i += 1) {
      const char = arr.pop();
    }
  }
  ```

### shift

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = Array(time).fill(0);

    for (let i = 0; i < time; i += 1) {
      const char = arr.shift();
    }
  }
  ```

### unshift

  ```javascript
  const solution = () => {
    const time = 100000;
    const arr = [];

    for (let i = 0; i < time; i += 1) {
      const char = arr.unshift(0);
    }
  }
  ```

<br><br><br><br>

## 결과

| push | pop | shift | unshift |
|------|-----|-------|---------|
|<img src="../images/push-pop-shift-unshift/push.png">|<img src="../images/push-pop-shift-unshift/pop.png">|<img src="../images/push-pop-shift-unshift/shift.png">|<img src="../images/push-pop-shift-unshift/unshift.png">|

push와 pop은 효율성이 좋다. 하지만 shift와 unshift는 효율성이 좋지 않다.  
  
MDN에 따르면,
> `shift` 메서드는 0번째 위치의 요소를 제거 하고 연이은 나머지 값들의 위치를 한칸 씩 앞으로 당깁니다. 그리고 제거된 값을 반환 합니다.  

이를 토대로 볼 때, shift 메서드에서 나머지 값들의 위치를 한칸 씩 앞으로 당기는 부분이 배열 전체를 한 번 순회하기 때문에 효율성 저하가 나타나는 것으로 보인다.  
  
앞으로 shift나 unshift 대신 최대한 push, pop이나 index를 통해 값을 바로 참조하는 방식을 사용하도록 해야겠다.
