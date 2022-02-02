---
title: 실전 리액트 프로그래밍 스터디 정리
date: 2020-11-25
tag: [Study]
---

"실전 리액트 프로그래밍" 스터디를 진행하면서 새롭게 알게된 내용과 제가 따로 공부해서 알게된 React 지식들에 대해서 작성하였습니다.

<br><br>

### Babel 없이 React 사용하기

React에서는 Babel이 필수적인 것이라 생각했었는데 아니었습니다. React.createElement 함수가 기본적인 JS문법이고, Babel을 통해 JSX 문법을 React.createElement 형식으로 변경해주는 것이었습니다.  
`React.createElement(component, props, ...children) => ReactElement`

  ```js
  import React, { useState } from 'react';

  export default function Counter() {
    const [count, setCount] = useState(0);

    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: () => setCount(count + 1) },
        '+'
      ),
      React.createElement(
        'div',
        null,
        count
      );
    );
  }
  ```

  이처럼 React.createElement를 사용한 코드는 가독성이 좋지 않다는 단점이 있습니다. 이를 JSX 문법으로 변경하면,

  ```js
  import React, { useState } from 'react';

  export default function Counter() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <div>{count}</div>
      </div>
    );
  }
  ```

### useState의 상태값 변경 함수는 비동기로 동작한다

리액트는 효율적으로 렌더링하기 위해 여러 개의 상태값 변경 요청을 배치(batch)로 처리합니다.

  ```js
  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState(state + 1);
    }, 1000);
    setTimeout(() => {
      setState(state + 10);
    }, 1000);
  }, []);

  // 렌더링 결과 10
  ```

  ```js
  const [state, setState] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState(prevState => prevState + 1);
    }, 1000);
    setTimeout(() => {
      setState(prevState => prevState + 10);
    }, 1000);
  }, []);

  // 렌더링 결과 11
  ```

### ContextAPI 사용 시 주의할 점

ContextAPI의 Provider의 value로 객체를 넣게 되면 컴포넌트가 렌더링 될 때마다 해당 객체를 계속 생성해주고 전달해주어 Consumer 컴포넌트도 다시 렌더링되는문제가 생깁니다.

  ```js
  const UserContext = React.createContext({ name: '' });

  function App() {
    const [name, setName] = useState('');

    return (
      <UserContext.Provider value={{ name }}> // { name } 을 계속 생성!
        <ChildCompnent />
      </UserContext.Provider>
    );
  }
  ```

  따라서 다음과 같이 변경하는 게 좋습니다.

  ```js
  const UserContext = React.createContext({ name: '' });

  function App() {
    const [user, setUser] = useState({ name: '' });

    return (
      <UserContext.Provider value={user}> 
        <ChildCompnent />
      </UserContext.Provider>
    );
  }
  ```

### useState에 대한 관점

useState 훅은 함수(컴포넌트)가 호출될 때마다(렌더링 되는 시점마다) 상태값을 return 합니다.

  ```js
  export default function Counter() {
    const [count, setCount] = useState(0);

    return (
      <>
        <div>{count}</div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </>
    )
  }
  ```

  즉, 이 컴포넌트에서 "+"버튼을 클릭해서 count의 상태가 바뀌면 컴포넌트는 다시 렌더링 되고, useState 훅 역시 다시 호출됩니다. 그리고 useState는 +1 된 상태값 1을 return하여 count에 할당하게 됩니다. 그리고 그 count는 렌더링되어 보여지게 되는 것입니다.

### useEffect의 호출 시점

useEffect는 의존 배열의 상태가 변경되었을 때, 컴포넌트가 마운트 될 때, 컴포넌트가 언마운트 될 때 호출됩니다.

  ```js
  export default function App() {
    const [isShowing, toggleIsShowing] = useState(false);

    return (
      <div>
        <button type="button" onClick={() => toggleIsShowing(!isShowing)}>보이기</button>
        {isShowing && <Counter /> }
      </div>
    );
  }

  function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      console.log('useEffect logic');
      return () => console.log('clean-up');
    }, [count]);

    return <button type="button" onClick={() => setCount(count + 1)}>증가</button>
  }
  ```

  위 코드가 화면에 렌더링 된 시점부터 콘솔 출력은 다음과 같습니다.

  ```js
  // "보이기" 버튼 클릭(true)
  useEffect logic // 컴포넌트 마운트로 호출

  // "증가" 버튼 클릭
  clean-up
  useEffect logic

  // "증가" 버튼 클릭
  clean-up
  useEffect logic

  // "보이기" 버튼 클릭(false)
  clean-up
  ```

### Redux 미들웨어 만들기

Redux 미들웨어는 store, next, action을 매개변수로 받는 커링함수로 만들 수 있습니다.

  ```js
  import { configureStore } from '@reduxjs/toolkit';
  import reducer from './slice';

  const myMiddleware = store => next => action => {
    console.log('prev');
    const result = next(action);
    console.log('next');
    return result;
  }

  export default configureStore({
    reducer,
    middleware: [myMiddleware],
  })
  ```

  상태가 업데이트 될 때마다 'prev'와 'next'가 콘솔에 출력됩니다.

### 상태변경 메서드를 불변 객체를 반환하도록 만드는 이유

상태값이 불변 객체이면 값의 변경 여부를 빠르게 확인할 수 있습니다. 이로인해 리액트의 렌더링 성능을 좋게 만드는 요인이 됩니다.

### useSelector 최적화

useSelector 훅으로 여러 상태값을 가져올 때, 객체 리터럴 문법을 사용하면 실제 상탯값이 바뀌지 않아도 매번 새로운 객체가 반환되는 문제가 생깁니다. 이러한 문제를 해결하는 방법으로는 다음과 같습니다.
  1. useSelector 훅을 필요한 상탯값 개수만큼 사용한다.
  2. reselect와 같은 라이브러리의 메모이제이션 기능을 이용한다.
  3. useSelector 훅의 두 번째 매개변수를 사용한다.  
  
  여기서 3번에 대해 살펴보면, useSelector의 두 번째 매개변수는 컴포넌트 렌더링 여부를 판단하는 역할을 합니다. 이 매개변수를 입력하지 않으면 참조값만 비교하는 단순 비교함수가 사용되어 컴포넌트가 불필요하게 자주 렌더링되는 문제가 생길 수 있습니다. 이때, react-redux에서 제공하는 shallowEqual 함수를 이용할 수 있습니다.

  ```js
  import { shallowEqual } from 'react-redux';

  export default function MyComponent() {
    const { value1, value2 } = useSelector(state => ({ value1: state.value1, value2: state.value2 }), shallowEqual);
  }
  ```

  그리고 shallowEqual 함수를 자주 사용하게 된다면 커스텀 훅으로 빼서 편하게 사용할 수 있습니다.

  ```js
  export const useMySelector = (selector) => {
    return useSelector(selector, shallowEqual);
  }
  ```

### redux-thunk

redux-thunk를 미들웨어로 사용하면 액션 객체가 아니라 함수를 dispatch 할 수 있는데, 이를 이용해서 비동기 작업을 편하게 처리할 수 있습니다.  
thunk의 코드는 다음과 같습니다.

  ```js
  function createThunkMiddleware(extraArgument) {
    //      { dispatch, getState } = store;
    return ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }

      return next(action);
    };
  }

  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;

  export default thunk;
  ```

  thunk는 다음과 같이 사용할 수 있습니다.

  ```js
  const loadData = () => async (dispatch, getState) => {
    const data = await api.request();

    dispatch(setData(data));
  };

  export default function App() {
    ...
    dispatch(loadData());
    ...
  }
  ```