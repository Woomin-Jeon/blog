---
title: "JavaScript의 동시성과 병행성"
date: 2020-07-09
category: "All"
draft: false
---

`참고` Bsidesoft의 맹기완 대표님의 [코드스피츠 85 거침없는 자바스크립트 2회차](https://www.youtube.com/watch?v=zxWxr1wQLg8&t=3162s)를 보고 이해한 바를 정리해본 내용입니다.

<br><br>

## JavaScript 동시성과 병행성의 흐름

`병행성(Parallelism)`이란 실제로 여러개의 쓰레드가 동시에 일을 처리하는 것을 의미하며,  
`동시성(Concurrency)`란 하나의 쓰레드가 빠르개 여러 개의 일을 처리하면서 마치 동시에 처리하는 것처럼 보이는 것을 의미합니다.  
  
JavaScript는 싱글 쓰레드로 구현되어 있기 때문에 동시성으로 일을 처리합니다.

<img src="../images/javascript-flow.png">

먼저 JavaScript engine이 check queue를 확인합니다. check queue에 걸리는 게 있으면 다시 engine work로 돌아와서 rendering 합니다. 만약 check queue에 걸리는 게 없으면 run JS, 즉 우리가 작성한 코드를 실행합니다. 그리고 다시 engine work로 돌아와서 rendering합니다. 다시 JavaScript engine은 chekc queue를 확인하고, 코드를 실행시킵니다. 이러한 순환을 JavaScript는 하나의 쓰레드가 계속 반복합니다. 그렇기 때문에 JavaScript는 동시성입니다.  
  
하지만 Web API들의 경우에는 이들이 병행적으로 동작하더라도 그저 callback queue에 명령을 쌓는 것뿐이고, check queue는 callback queue에 있는 명령들을 하나씩 꺼내와서 JavaScript engine에게 넘기기만 하면 되기 때문에 `병행성으로 인한 충돌 위험이 존재하지 않습니다`.  
  
이 때문에 JavaScript 자체는 싱글 쓰레드가 동시성으로 작업을 처리하지만, callback queue를 기점으로 병행성을 통한 작업 처리가 가능해지는 것입니다.

<br><br>

## JavaScript 동시성으로 인한 문제점

JavaScript가 동시성으로 인해 가지고 있는 문제점은 바로 위의 engine work, check queue, run JS 세 가지의 과정 중 하나라도 지연된다면 나머지 모든 것들이 지연된다는 것입니다. 흔히 우리가 겪게되는, 코드가 무거워짐에 따라 rendering이 느리게 되는 문제점 역시 JavaScript의 동시성으로 인한 문제점이라고 볼 수 있습니다. 이를 해결하기 위한 방법으로는 어떤 것이 있을까요?

<br><br>

## Non-Blocking JavaScript

먼저, Non-Blocking에 들어가기에 앞서, Blocking이란 무엇인지 간단하게 알아보도록 하겠습니다.  
우리가 지금 사용하는 거의 모든 컴퓨터는 폰노이만 머신입니다. 폰노이만 머신은 메모리에 적재된 명령을 순차적으로 수행하며, 그 수행하는 과정이 실행되면 중간에 중단할 수 없습니다. 이렇게 명령이 진행되고 있는 시점에서 외부의 개입을 할 수 없는 상황을 Blocking 되었다고 합니다.  
JavaScript의 싱글쓰레드가 작업하는 방식도 Blocking 되어있다고 볼 수 있습니다. 예를 들어, run JS 부분에서 for문으로 100,000번 루프하는 코드가 존재한다면, 무조건 for문을 100,000번 모두 순회한 다음 engine work로 넘어가서 렌더링을 하기 때문에 이로인한 시간만큼 렌더링이 지연됩니다. 이를 해결하기 위해 간접적으로 Blocking을 피하는 방식이 바로 Non-Blocking입니다.  
  
```javascript
const working = () => {};

// 일반적인 for문 10만번이 모두 순회된 뒤에 engine work로 넘어갑니다.
for (let i = 0; i < 100000; i++) working();

// None Blocking for문
const nonBlockingFor = (max, load, callback) => {
  let i = 0;
  const f = time => {
    let cur = load;
    while (cur-- && i < max) {
      callback();
      i++;
    }

    if (i < max - 1) {
      requestAnimationFrame(f);
    }
  };
  requestAnimationFrame(f);
}

// None Blocking for문 호출
// 100번 순회할 때 마다 engine work로 가서 rendering합니다.
nonBlockingFor(100000, 100, working);
```
