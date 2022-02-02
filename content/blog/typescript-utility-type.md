---
title: "TypeScript Utility Type"
date: 2021-05-08
category: "All"
draft: false
---

자주 마주쳤지만 대충 알고 넘어갔던... 하지만 앞으로 자주 사용할 것 같은 TypeScript Utility Type들을 예제 코드와 함께 정리해봤습니다.

<br>


## Partial\<T\>

T로 들어오는 타입의 프로퍼티들을 옵셔널하게 바꿉니다. 즉, T의 부분집합을 허용하는 타입을 만듭니다.

  ```ts
  interface Person {
    name: string
    age: number
  }
  
  let person: Partial<Person>
  person = {} // 가능
  person = { name: 'woo' } // 가능
  person = { name: 'woo', age: 26 } // 가능
  person = { sex: 'male '} // 불가능
  ```

## Readonly\<T\>

T로 들어오는 타입을 읽기전용으로 만듭니다.

  ```ts
  interface Person {
    name: string
    age: number
  }

  let person: Readonly<Person>
  person = { name: 'woo', age: 26 }
  person.name = 'min' // 불가능
  ```

## Record<K, T>

"key: K, value: T"로 하는 객체에 대한 타입을 만듭니다.

  ```ts
  type StringNumber = 'one' | 'two' | 'three'

  interface Person {
    name: string
    age: number
  }


  let personRecord: Record<StringNumber, Person>
  personRecord = {
    'one': { name: 'woo', age: 26 },
    'two': { name: 'min', age: 36 },
    'three': { name: 'jeon', age: 46 },
  }
  ```

## Pick<K, T>

타입 K에서 T에 해당하는 프로퍼티만 뽑아서 타입을 만듭니다.

  ```ts
  interface Person {
    name: string
    age: number
    sex: string
  }

  let person: Pick<Person, 'name' | 'age'>
  person = { name: 'woo', age: 26 }

  let person: Pick<Person, 'sex' | 'age'>
  person = { sex: 'male', age: 26 }
  ```

## Omit<K, T>

타입 K에서 T에 해당하지 않는 프로퍼티만 뽑아서 타입을 만듭니다. (Pick과 반대개념)

  ```ts
  interface Person {
    name: string
    age: number
    sex: string
  }

  let person: Omit<Person, 'name'>
  person = { age: 26, sex: 'male' }
  
  let person: Omit<Person, 'name' | 'sex'>
  person = { age: 26 }
  ```

## Exclude<T, U>

타입 T에서 U가 가능한 타입을 제거한 타입을 만듭니다.

  ```ts
  enum EnumStringNumber {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE'
  }

  let number: Exclude<EnumStringNumber, 'ONE' | 'TWO'>
  number = EnumStringNumber.THREE // 가능
  number = EnumStringNumber.ONE // 불가능

  type StringNumber = 'ONE' | 'TWO' | 'THREE'

  let number: Exclude<StringNumber, 'ONE' | 'TWO'>
  number = 'THREE' // 가능
  number = 'ONE' // 불가능
  ```

## Extract<T, U>

타입 T에서 U에 해당하는 타입만 뽑아서 타입을 만듭니다. (Exclude와 반대 개념)

  ```ts
  enum EnumStringNumber {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE'
  }

  let number: Extract<EnumStringNumber, EnumStringNumber.ONE>
  number = EnumStringNumber.ONE // 가능
  number = EnumStringNumber.THREE // 불가능

  type StringNumber = 'ONE' | 'TWO' | 'THREE'

  let number: Extract<StringNumber, 'ONE'>
  number = 'ONE' // 가능
  number = 'THREE' // 불가능
  ```

## NonNullable\<T\>

타입 T에서 null과 undefined인 타입은 제거한 타입을 만듭니다.

  ```ts
  type Names = 'woo' | 'min' | null | undefined

  type ExistingName = NonNullable<Names>
  // type ExistingName = "woo" | "min"
  ```
