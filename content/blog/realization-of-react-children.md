---
title: 'React에서 컴포넌트가 리렌더링되면 children도 리렌더링 될까?'
date: 2023-03-01
category: 'All'
draft: false
---

여기 다음과 같이 children을 받아서 레이아웃을 잡아주는 `Layout`이라는 컴포넌트가 있습니다.

```tsx
const Layout = ({ children }) => {
  const [, rerender] = useReducer(v => v + 1, 0)
  console.log('Layout rendered')

  return (
    <div>
      <button onClick={rerender}>리렌더링</button>

      <HeaderComponent />
      <div>{children}</div>
      <FooterComponent />
    </div>
  )
}
```

`Layout` 컴포넌트에는 리렌더링 버튼이 하나 있는데, 이 버튼이 클릭되면 `Layout` 컴포넌트가 리렌더링 되며 콘솔에 "Layout rendered"라는 문구가 찍힙니다.

그리고 이 `Layout` 컴포넌트를 다음과 같이 가져다가 사용했습니다.

```tsx
const App = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

const HomePage = () => {
  console.log('HomePage rendered')

  return (
    <ul>
      <li>하나</li>
      <li>둘</li>
      <li>셋</li>
    </ul>
  )
}
```

이 때, 만약 `Layout` 컴포넌트에 있는 리렌더링 버튼을 클릭하면 children으로 들어간 `HomePage` 컴포넌트는 리렌더링되어서 콘솔에 "HomePage rendered"가 찍힐까요?

직관적으로 App 컴포넌트만 보면 마치 `HomePage` 컴포넌트가 `Layout` 컴포넌트의 자식 컴포넌트처럼 보여서 상위에 존재하는 `Layout` 컴포넌트가 리렌더링되면 당연히 자식컴포넌트인 `HomePage`도 리렌더링 될 것 같았습니다.

```tsx
const App = () => {
  return (
    부모 컴포넌트?
    <Layout>
      자식 컴포넌트?
      <HomePage />
    </Layout>
  )
}
```

하지만 `Layout` 컴포넌트에서 아무리 리렌더링 버튼을 클릭해도 `HomePage` 컴포넌트는 리렌더링 되지 않습니다.

사실 `HomePage` 컴포넌트는 `Layout` 컴포넌트 "내부"에 존재하는 컴포넌트가 아니라 children이라는 "props"를 통해 받은 값이기 때문입니다.

그래서 보기에는 자식처럼 보이지만 사실 HomaPage 컴포넌트는 `Layout` 컴포넌트의 입장에서는 단지 props에 불과하며, 컴포넌트가 리렌더링 된다고 해서 props가 바뀌진 않으므로 `HomePage`는 리렌더링 되지 않습니다.

<br /><br />

머리로 생각하면 끄덕끄덕할만한 내용이지만, JSX 상에서 눈으로 볼 때는 마치 부모 자식처럼 보이다보니 헷갈렸던 것 같습니다.

부족함이 많은 글 읽어주셔서 감사합니다.
