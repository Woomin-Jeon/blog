---
title: "「Algorithm」 재귀함수"
date: 2020-02-09
tag: ["Posts"]
---


함수 안에서 다시 자기 자신을 호출하는 함수를 "재귀함수" 라고 한다. 재귀함수를 쓰는 이유는, 먼저 가독성의 측면에서 알고리즘 자체가 재귀적으로 표현하는 것이 자연스러울 경우 사용하며, 불필요한 변수 사용을 줄이고 반복문의 사용 없이 반복문처럼 사용하고 싶을 경우 사용한다.  
  
아래는 Factorial을 계산하는 코드이다.  

```javascript
// 반복문을 이용한 Factorial 계산
const Factorial = n => {
  let result = 1;

  for(let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
};
```

```javascript
// 재귀를 이용한 Factorial 계산
const Factorial = n => {
  if(n === 1) {
    return 1;
  }

  return n * Factorial(n - 1);
};
```

일반적으로 함수는 호출하게되면 함수가 호출된 위치를 가리키는 주소 값이 저장돼야 한다. 그렇기 때문에 함수가 재귀적으로 호출되는 경우, 함수 안에서 함수가 계속 호출되고 차례로 리턴한다. 그래서 호출 횟수가 많아지면 돌아갈 곳의 주소 값을 저장하고 있는 스택이 넘치거나 프로그램의 실행 속도가 느려지는 단점이 있다. 이러한 이유 때문에 재귀함수는 잘 사용되지 않는다.  
  
위의 Factorial 재귀함수의 경우  

1. 리턴되는 함수 값을 받아 -> Factorial(n -1)
2. 연산을 하고 -> n * Factorial(n -1)
3. 다시 그 값을 리턴하는 -> return n * Factorial(n -1) 방식을 취한다.  
  
그렇기 때문에 함수가 호출된 위치로 돌아갔을 때 실행할 작업, 즉 연산이 없다면 이 문제를 해결할 수 있다.  
  
"꼬리재귀"를 사용함으로써 이 문제를 해결해보자.  

```javascript
// 꼬리재귀를 이용한 Factorial 계산
const Factorial = n => {
  return FactorialTailRecursive(n, 1);
};

const FactorialTailRecursive = (n, res) => {
  if(n === 1) {
    return res;
  }

  return FactorialTailRecursive(n - 1, res * n);
};
```

꼬리재귀에서 주의할 점은 이 꼬리재귀가 코드 상에서 위의 스택 문제를 해결해주는 것이 아니라, 컴파일러가 꼬리재귀를 인식하고 코드를 최적화 해줌으로써 일반재귀가 가지는 문제점을 해결해주는 것이므로, 최적화를 시켜주는 컴파일러인지 확인 하고 사용해야 한다.
