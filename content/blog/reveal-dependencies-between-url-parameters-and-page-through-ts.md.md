---
title: 'URL파라미터와 페이지간의 의존성을 TypeScript를 통해 드러내기 - 제네릭타입의 활용'
date: 2022-12-14
category: 'All'
draft: false
---

## 배경

개발을 하다보면 아래 코드와 같이 페이지간의 정보전달을 위해 패스파라미터 혹은 쿼리파라미터를 사용하곤 합니다. 예를들어, `/posts`라는 path를 갖는 "게시글 목록 페이지"가 존재하고, 쿼리파라미터로 `sort`를 받는다면 다음과 같이 사용될 것입니다.

```ts
// 어떤 페이지
history.push('/posts?sort=created_at') // sort가 created_at이라는 정보를 전달합니다.

// "/posts" (게시글 목록 페이지)
const queryParams = getQueryParams()
if (queryParams.sort === 'created_at') {
  // do something
}
```

하지만 이런 사용법에는 문제가 있는데, 페이지 라우팅을 하려는 곳(쿼리파라미터를 붙이는 쪽)과 "게시글 목록 페이지"(쿼리파라미터를 사용하는 쪽)간의 관계가 명시적이지 않다는 것입니다.  
만약 "게시글 목록 페이지"에서 실수로 `queryParams.sort`가 아니라 `queryParams.order`로 정의를 바꾸게 되거나, 어떤 페이지에서 "게시글 목록 페이지"로 쿼리파라미터를 붙일 때 오타가나서 `/posts?sort=craete_at`으로 코드를 작성한다면 이는 버그로 이어집니다. 하지만 개발자는 런타임에 오류를 발견하기 전까지 문제가 발생했는지 알 수가 없습니다.

아울러, "게시글 목록 페이지"가 쿼리파라미터로 받을 수 있는 스펙이 따로 선언되어있지 않다보니 개발을 할 때, "게시글 목록 페이지" 컴포넌트 파일로 이동해서 `getQueryParams()`에서 어떤 값들을 사용하는지 살펴본 뒤 쿼리파라미터 코드를 작성해야합니다.

그래서 이렇게 그냥 문자열을 통해 라우팅 코드를 작성하는 방식은 다음과 같은 문제점으로 귀결됩니다.

1. 페이지마다 사용할 수 있는 쿼리파라미터에 대한 스펙이 선언적이지 않다.
2. 페이지와 쿼리파라미터간의 의존성이 드러나 있지 않아 버그로 이어질 가능성이 높다.

위의 문제를 해결하기 위해

1. 페이지마다 path, 받을 수 있는 쿼리파라미터를 선언해 둘 객체를 생성하고,
2. TypeScript 타입추론이 되도록 구현하는 방향으로

구현을 해보았습니다.

## 페이지의 정보를 담는 routes 객체 구현하기

페이지의 path 정보, 그리고 페이지가 받을 수 있는 쿼리파라미터가 무엇인지를 선언하는 객체를 구현하였습니다.  
개발자는 이 파일만 보면 이제 어떤 페이지가 어떤 패스파라미터, 쿼리파라미터를 받아야하는지 혹은 받을 수 있는지를 알 수 있게됩니다.

```ts
// routes.ts
const routes = {
  '게시글 목록 페이지': {
    path: '/posts' as const,
    query: {
      sort: ['created_at', 'recommend'] as const,
    },
  },
  "나의 게시글 상세 페이지": {
    path: "/users/:userId/posts/detail/:postId" as const,
    query: {
      tab: ["content", "review", "buy"] as const,
      highlight: ["true"] as const,
    }
  },
  ...
}
```

## path에서 패스파라미터를 뽑아내는 제네릭타입 구현하기

먼저 path에서 패스파라미터를 뽑아내기 위한 제네릭타입을 구현합니다.
`/users/:userId/posts/detail/:postId`와 같은 string 타입에 대해서 다음과 같은 과정으로 userId와 postId라는 패스파라미터를 뽑아낼 예정입니다.

1. "/" 문자열을 기준으로 잘라서 튜플을 만든다  
   → `["users", ":userId", "posts", "detail", ":postId"]`
2. ":"으로 시작하는 문자열만 남긴다  
   → `[never, ":userId", never, never, ":postId"]`
3. ":"을 없앤다  
   → `[never, "userId", never, never, "postId"]`
4. 튜플을 Union타입으로 만든다  
   → `"userId" | "postId"`
5. 이를 key로 하는 Record 타입을 생성한다.

그리고 이 과정에 필요한 제네릭 타입들을 구현하면 다음과 같습니다.

```ts
// 문자열을 특정 문자 기준으로 자릅니다.
type Split<S, D extends string> = S extends `${infer F}${D}${infer R}` ? [F, ...Split<R, D>] : [S]

// 튜플에서 특정 문자로 시작하는 것만 남깁니다.
type RemainStartWith<T extends string, S extends unknown> = S extends `${T}${infer R}` ? `${T}${R}` : never
type RemaintartWithColonFromTuple<T extends unknown[]> = T extends [infer K, ...infer Rest]
  ? [RemainStartWith<":", K>, ...RemaintartWithColonFromTuple<Rest>]
  : []

// 튜플에서 특정 문자로 시작하는 경우 그 문제를 제거합니다.
type RemoveStartWith<T extends string, S extends unknown> = S extends `${T}${infer R}` ? R : never
type RemoveStartWithColonFromTuple<T extends unknown[]> = T extends [infer K, ...infer Rest]
  ? [RemoveStartWith<":", K>, ...RemoveStartWithColonFromTuple<Rest>]
  : []

// 튜플을 Union 타입으로 만듭니다.
type TupleToUnion<A extends string[]> = A[number]
```

그리고 이 제네릭 타입들을 활용하며 path에서 패스파라미터를 뽑아내는 제네릭 타입을 구현하면,

```ts
type MY_URL = '/users/:userId/posts/detail/:postId'
type R1 = Split<MY_URL, '/'> // ["users", ":userId", "posts", "detail", ":postId"]
type R2 = RemaintartWithColonFromTuple<R1> // [never, ":userId", never, never, ":postId"]
type R3 = RemoveStartWithColonFromTuple<R2> // [never, "userId", never, never, "postId"]
type R4 = TupleToUnion<R3> // "userId" | "postId"

type ExtractPathParams<P extends string> = TupleToUnion<
  RemoveStartWithColonFromTuple<RemaintartWithColonFromTuple<Split<P, '/'>>>
>
type R5 = ExtractPathParams<MY_URL> // "userId" | "postId"
```

이렇게 `ExtractPathParams` 제네릭 타입을 구현했습니다. ([TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAEg5uwE8cF9HBFx1CdS4VAmKVIBjrAAk4HnHA6HaSQUM7AJpsBOmgOgCgAXATwAcBTUAZXoBsBLagHhYBpQAEVCMAHtUYA7ACYBnUHOoAnTlIDmAPlABeVqInT5oAAYASAN5qAZo2WgAYgF9LQl1am37AJScnQAPygANoOguQRbFy83oJCmgC6oABcISwJlJQgoIA5S4Awq4ALo4A4g4goUPiAO0OAieOAGquAKU2ggME1gDOdoIAVDYCCdWRUdEyg3owAtgCGaizUw8rUAOrcABY8ACoGkrIKSqoagiwrRgoArlIA1lIA9gDuUtp6O+KrxuYWi+42dv1+gaaWz5a+-qlSRgANzsNAYzAGIzUEyms2ocwAwqd2KcpA5lKdBot9hxGEtdmtQIcThcpMEEtdQMs7nsQq97ABpcIRen9RhKDKgT7BSGjKTjSYzeY8ABEyRFggZmmZ5F50MFcMRyNR6Mx2NxPAGSkSlC5qXJmWy+WKpVQlVqDUAvTWABrHQIAP2oggBwJwA+naBHYAHGsAlqvdMF9SGnEEC2HC6mGQkbNTqbYE4zEs6XSm3MMPb4vTxvP6fbwpUCAkHKX0QoYBxhBoXwpEotEYrE49h40P3A7HeNkim6KkxhTBVlM0ARcisrXUTnc-2BmHlhZiiWgKUy8elyeKysqmvq+ua9nUHV6kIZLJgfLwACqUk4qNAgAGFwCh43hQM1ALctPt6zA3jEWpzPF6kPAAgl2igqJG5KUn+wRSPsgwAEZ2Aer6gAAsgAmgA+ie3gADIdgA5MA+xyHYcjAMkBF2AAkjIwD0KcSjETIjATJw7AkTRSiUThhb9AAjB2UTcDwKHoVhgh4Th2jZMEIpkcocizmKMmUfJbHUHJggigxTHsPJyQqUpGQId4ABMHZylIy7zKu1ZqnWeLeNxElgBBwJ2OppGEcoSmCHmrm5i5yhuXpMgigZ4L9AAzKZxYTgqlnKtZtYasZjkhD5AWgNJHleX5+bef56lBSFXHeAALB276ft+qKauFKWZRRwWgAAPhlhWZAhACiEjKMMADG1AAArDPCQ09YMcg8ANgERholIVV+57VbqbKDCWZYrvFqqJZuZkWRWm3rrZfAcAJA2icA4maJolDXYZACsHZdSofWDcNcyjcM42CWhGGYXVimNS1IqFUAA))

## query에 튜플로 선언해둔 값을 Union으로 변환하기

query는 객체이고, 각 key의 value들은 튜플이므로, 객체를 순회하면서 value들에 TupleToUnion 제네릭타입을 적용하면 쿼리파라미터의 타입을 얻을 수 있습니다.
그리고, 객체를 순회하는 타입 문법은 다음과 같습니다.

```ts
type Obj<O extends Record<keyof O, any>> = {
  [K in keyof O]: O[K]
   ^^^^^^^^^^^^
// 객체로 들어오는 O 타입의 key들로 K를 만들겠다는 의미입니다.
}
```

이를 토대로 쿼리파라미터 타입을 뽑아내는 제네릭 타입을 구현하면 다음과 같습니다.

```ts
type ExtractQueryParams<Q extends Record<keyof Q, any>> = {
  [K in keyof Q]?: TupleToUnion<Q[K]>
}
```

## 라우팅 함수 작성하기

이제 각 routes.ts 파일에 선언해둔 각 페이지의 메타정보(path, query)에 대해 알고있고, 타입추론도 가능해졌으니 이를 통해 라우팅 함수를 구현합니다.

```ts
type PageName = keyof typeof routes // routes 객체의 key들이 페이지의 이름입니다.
type PathParams<P extends PageName> = Record<
  ExtractPathParams<typeof routes[P]['path']>,
  string
>
type QueryParams<P extends PageName> = ExtractQueryParams<
  typeof routes[P]['query']
>

const typeSafePush = <P extends PageName>(
  pageName: P,
  params: {
    pathParams: PathParams<P>
    queryParams: QueryParams<P>
  }
) => {
  const route = routes[pageName]
  const filledPath = fillPathWithParams(route.path, params.pathParams)
  const queryString = stringifyQuery(params.queryParams)

  history.push(`${filledPath}?${queryString}`)
}
```

이제 사용하는 쪽에서는 다음과 같이 라우팅을 할 수 있습니다.

```ts
typeSafePush('나의 게시글 상세 페이지', {
  pathParams: { userId: '1111', postId: '222' },
  queryParams: { tab: 'review', highlight: 'true' },
})
```

이제 `typeSafePush` 함수의 첫번째 인자로 들어가는 페이지 이름도 타입추론이 되고, `pathParams`와 `queryParams`도 모두 routes.ts 파일에 선언해둔 해당 페이지의 라우팅 정보에 맞게 모두 잘 타입추론 됩니다.

## 결론

이로써 이제 개발자는

- `routes.ts` 파일에 선언된 각 페이지의 정보만 보고 어떤 페이지가 어떤 패스파라미터를 필요로 하고, 어떤 쿼리파라미터를 받을 수 있는지 알 수 있으며,
- `typeSafePush` 함수의 첫번째 인자로 페이지 이름을 작성함으로써 기존에 path로된 문자열을 적는 것보다 더 가독성있게 라우팅 코드를 작성할 수 있고,
- 타입추론이 모두 되기 때문에 오탈자나, URL 파라미터 스펙 변경으로 인한 사이드이펙트 없이

개발할 수 있게 되었습니다.

개인적으로 코드의 유지보수에 있어서 가장 중요한 것은 의존성을 감추는게 아니라 드러내는 것이라고 생각합니다. 그러한 점에서 이 작업은 URL 파라미터와 페이지와의 관계를 잘 드러내게 했고, 이 관계를 타입세이프하게 처리하여 더 견고하게 했다고 생각해서 개인적으로 마음에 들어 블로그 포스팅을 해보았습니다.

부족한 글 읽어주셔서 감사합니다.
