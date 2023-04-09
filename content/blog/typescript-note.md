---
title: 'TypeScript 유틸리티 타입 창고'
date: 2023-02-07
category: 'All'
draft: false
---

# String 관련

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

### Join

string으로 된 튜플을 join하여 templete literal로 만들기

```ts
type Join<T extends unknown[], W extends string>
  = T extends [infer E, ...infer Rest]
    ? E extends string
      ? `${W}${E}${Join<Rest, W>}`
      : never
    : ``

type Result = Join<['hello', 'world', string], '/'> // `/hello/world/${string}`
```

# Tuple 관련

### Filter

튜플에서 특정 타입을 남기거나 제거하기

```ts
type RemainFilter<A extends unknown[], T> = A extends [infer E, ...(infer Rest)]
  ? E extends T
    ? [E, ...RemainFilter<Rest, T>]
    : RemainFilter<Rest, T>
  : []
type RemoveFilter<A extends unknown[], T> = A extends [infer E, ...(infer Rest)]
  ? E extends T
    ? RemoveFilter<Rest, T>
    : [E, ...RemoveFilter<Rest, T>]
  : []

type Tuple = [number, 'hello', string, null, '']

type Result1 = RemainFilter<Tuple, string> // ['hello', string, '']
type Result2 = RemoveFilter<Tuple, '' | null> // [number, 'hello', string]
```

### TupleToUnion

튜플을 Union 타입으로 만들기

```ts
type TupleToUnion<A extends unknown[]> = A[number]

type Result = TupleToUnion<['hello', boolean, number]> // 'hello' | boolean | number
```

### UnpackTuple

튜플 내부의 type들에 대해 unpack된 타입을 만들기

```ts
type Pack<T> = { data: T }

type UnpackTuple<T> = T extends [Pack<infer U>, ...(infer Rest)]
  ? [U, ...UnpackTuple<Rest>]
  : []

type Result = UnpackTuple<[Pack<string>, Pack<number>, Pack<boolean>]> // [string, number, boolean]
```

# Array 관련

### UnpackArray

Array 타입 내부의 값을 타입으로 뽑아내기

```ts
type UnpackArray<A extends any[]> = A[0]

type Result = UnpackArray<string[]> // string
```

### ArrayToRecord

Array 타입을 Record 타입으로 만들기

```ts
type ArrayToRecord<
  A extends Record<string, any>[],
  Key extends keyof A[0]
> = A extends [infer U, ...(infer Rest)]
  ? U extends UnpackArray<A>
    ? U[Key] extends string | number | symbol
      ? Rest extends Record<string, any>[]
        ? { [k in U[Key]]: U } & ArrayToRecord<Rest, Key>
        : {}
      : {}
    : {}
  : {}

type Result = ArrayToRecord<
  [
    { id: 'a'; name: 'woo' },
    { id: 'b'; name: 'min' },
    { id: 'c'; name: 'hello' }
  ],
  'id'
>
// {
//   a: {
//     id: 'a';
//     name: 'woo;
//   } &
//   b: {
//     id: 'b';
//     name: 'min;
//   } &
//   c: {
//     id: 'c';
//     name: 'hello;
//   }
// }
```
