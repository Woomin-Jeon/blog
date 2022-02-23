---
title: "TypeScript Note"
date: 2022-02-03
category: "All"
draft: false
---

## 타입 가드  

타입 가드 함수의 네이밍은 `is타입`과 같은 형식으로 작성합니다.

  ```ts
  // 타입 가드 함수
  const isApple = (fruit: Fruit): fruit is Apple => 'apple' in fruit

  if (isApple(data)) {
    console.log(data.apple) // 타입추론 가능
    return;
  }

  console.log(data.banana) // 타입추론 가능
  ```   



## Generic Default Type

다음과 같이 제네릭으로 된 타입에 기본 타입을 지정해줄 수 있습니다.
    
  ```tsx
  type GenericType<T> = T
  type ResultType = GenericType
                    ^^^^^^^^^^^
      TypeError: 타입 arguments를 주입해야함.
  type ResultType = GenericType<string> // string
  
  // 여기서 Default Type을 지정해줄 수 있습니다.
  
  type GenericType<T = number> = T
  type ResultType = GenericType<string> // string
  type ResultType = GenericType // number
  ```
    
## Conditional Type

다음과 같이 조건에 따른 타입 부여를 할 수 있습니다.
    
  ```tsx
  interface Person {
    name: string
    age: number
  }
  
  type TestPerson<T> = T extends Person ? string : number
  
  type Test1 = TestPerson<Person> // string
  type Test2 = TestPerson<null> // number
  ```


## infer

infer 키워드를 이용하면 추론될 타입 변수를 미리 사용하는 게 가능합니다.
  
  ```tsx
  type TestType<T> = T extends (infer U)[] ? U : null
                                ^^^^^^^^^^^
                T의 모양은 U[]일 것으로 추론해서 맞다면 U를, 아니라면 null 타입 반환
  
  type Test1 = TestType<number[]> // number
  type Test2 = TestType<number> // null
  type Test3 = TestType<string> // null
  ```
    
## Template Literal Types

Template Literal Types를 이용해서 문자열로 된 것에 대해 유연한게 타입을 정의할 수 있습니다.
    
  ```tsx
  type CheckPrefix<P extends string, S>
    = S extends `${P}${string}` ? true : false
  
  type Result1 = CheckPrefix<'prefix_', 'prefix_apple'> // true
  type Result2 = CheckPrefix<'prefix_', 'apple'> // false
  ```
    
## 재귀

재귀를 이용한 구현도 가능합니다.
    
  ```tsx
  type Split<S, D extends string> = S extends `${infer F}${D}${infer R}` ? [F, ...Split<R, D>] : [S]
       ^^^^^                                                                   ^^^^^^^^^^^^^^
  들어오는 문자열을 split하는 타입을 만드는 제네릭 타입                                       재귀 사용
  
  type Test = 'aaa.bbb.ccc.ddd.eee'
  type Result = Split<Test, '.'> // ["aaa", "bbb", "ccc", "ddd", "eee"]
  
  ```

<br><br><br><br><br>

# (번외) 내가 쓰려고 만든 Utility Types

### Split  

string을 split해서 튜플타입으로 만들기
 
  ```ts
  type Split<S, D extends string>
    = S extends `${infer F}${D}${infer R}` ? [F, ...Split<R, D>] : [S]
  
  type Result = Split<'hello,world,good', ','> // ['hello', 'world', 'good']
  ```

### Trim

string의 양옆 공백이 제거된 string 타입을 만들기

  ```ts
  type TrimStart<S>
    = S extends ` ${infer V}` ? TrimStart<V> : S
  type TrimEnd<S>
    = S extends `${infer V} ` ? TrimEnd<V> : S
 
  type Trim<S> = TrimStart<TrimEnd<S>>
 
  type Result = Trim<'   hello  '> // 'hello'
  ```

### Replace

string에서 특정 문자가 변경된 string 타입을 만들기
  
  ```ts
  type Replace<S, From extends string, To extends string> 
    = S extends `${infer A}${From}${infer B}` ? Replace<`${A}${To}${B}`, From, To> : S

  type Result = Replace<'hello,world,good', ',', '-'> // 'hello-world-good'
  ```

### UnpackTuple

튜플 내부의 type들에 대해 unpack된 타입을 만들기

```ts
type Pack<T> = { data: T }

type UnpackTuple<T> = T extends [Pack<infer U>, ...infer Rest] ? [U, ...UnpackTuple<Rest>] : []

type Result = UnpackTuple<[Pack<string>, Pack<number>, Pack<boolean>]> // [string, number, boolean]
```
