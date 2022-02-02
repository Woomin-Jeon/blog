---
title: "react-router 구현하며 이해하기"
date: 2021-02-26
category: "All"
draft: false
---

## 동기

react-router의 BrowserRouter를 사용하다가 발생한 `Cannot GET /` 이슈를 처리하는 방법을 찾아보다가 서버에서 해당 index.html 파일을 내려주면 해결할 수 있다는 것을 알게되었습니다. 하지만 index.html 파일을 내려주면 왜 해결되는지를 알지 못하고 있어서 이를 이해해보고자 react-router 코드를 뜯어보고 직접 구현해보기로 마음먹었습니다.  
  
제가 [react-router GitHub 소스코드](https://github.com/ReactTraining/react-router)를 읽으면서 이해한 내용을 바탕으로 간단하게 react-router(BrowserRouter, Switch, Route, useHistory)를 구현해보았고, 다른 분들께 도움이 되길 바라면서 해당 포스팅을 작성합니다.

## 초기 페이지 구현하기

먼저 라우팅을 위한 페이지들 작성해보겠습니다.  
간단하게 \<Home\>, \<Login\>, \<Abou\> 컴포넌트 세 개를 만들고, 이 페이지들을 라우팅하기위한 \<Navagator\> 컴포넌트를 작성합니다.

  ```js
  // App.jsx

  import React from 'react';

  export default function App() {
    return (
      <>
        <Navigator />
        <Home />
        <Login />
        <About />
      </>
    );
  }

  function Navigator() {
    return (
      <>
        <button>/home</button>
        <button>/login</button>
        <button>/about</button>
      </>
    );
  }

  function Home() {
    return <h1>Home 페이지 입니다</h1>;
  }

  function Login() {
    return <h1>Login 페이지 입니다</h1>;
  }

  function About() {
    return <h1>About 페이지 입니다</h1>;
  }
  ```

## \<Router\>와 \<Route\> 구현하기

다음으로 URL path에 맞게 해당 컴포넌트를 조건부렌더링 해줄 수 있도록 \<Router\>와 \<Route\> 컴포넌트를 구현해보겠습니다. 이때, Router(부모)에서 관리하는 상태(location)를 Route(자식)에게 전송하도록 하기 위해서 ContextAPI로 RouterContext를 먼저 구현합니다.

  ```js
  // RouterContext.jsx

  import { createContext } from "react";

  const RouterContext = createContext();

  export default RouterContext;
  ```

  다음으로 해당 RouterContext를 이용하여 \<Router\>를 구현합니다.

  ```js
  // Router.jsx

  import React from 'react';

  import RouterContext from './context/RouterContext';

  export default function Router({ children }) {
    const [location, setLocation] = useState(window.location.pathname);  

    return (
      <RouterContext.Provider value={{ location }}>
        {children}
      </RouterContext.Provider>
    );
  }
  ```

  여기서 `location`은 현재 URL을 토대로 화면에 컴포넌트를 갱신할 때 사용하기 위한 상태값입니다.  

  \<Route\> 역시 RouterContext를 토대로 location 값을 불러와서 자신의 path와 매칭되면 렌더링하고, 일치하지 않으면 렌더링하지 않도록 구현합니다.

  ```js
  // Route.jsx

  import React, { useContext } from 'react';

  import RouterContext from './context/RouterContext';

  export default function Route({ path, component: Component }) {
    const { location } = useContext(RouterContext);
    
    return path.match(location)
      ? <Component />
      : null;
  }
  ```

  마지막으로 앞서 구현한 \<Router\>와 \<Route\>를 App.jsx 파일에 적용하고, \<Navigator\>에도 URL 이동 로직을 추가합니다.

  ```js
  // App.jsx

  import Router from './react-router/Router';
  import Route from './react-router/Route';

  export default function App() {
    return (
      <>
        <Navigator />
        <Router>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/about' component={About} />
        </Router>
      </>
    );
  }

  function Navigator() {
    return (
      <>
        <button onClick={() => location.href = '/'}>/home</button>
        <button onClick={() => location.href = '/login'}>/login</button>
        <button onClick={() => location.href = '/about'}>/about</button>
      </>
    );
  }
  ```

  그러면 다음과 같이 **/**의 경우에는 Home, Login, About 컴포넌트 모두 URL이 매칭되므로 세 컴포넌트를 렌더링하게 되고,  
  **/login**의 경우에는 Login 컴포넌트만,  
  **/about**의 경우에는 About 컴포넌트만 렌더링하는 것을 확인할 수 있습니다.

  ![1](https://user-images.githubusercontent.com/59194356/109264628-9eac4300-7848-11eb-8522-2b4fc06dd450.gif)

## \<Switch\> 구현하기

해당 URL과 매칭되는 모든 컴포넌트들을 렌더링하는 게 아니라 첫번째로 매칭되는 컴포넌트만 렌더링 되도록 하기 위해서 \<Switch\>를 구현해보도록 하겠습니다.

  ```js
  // Switch.jsx

  import React, { useContext } from 'react';

  import RouterContext from './context/RouterContext';

  export default function Switch({ children }) {
    const { location } = useContext(RouterContext);

    const childrenType = toString.call(children);
    const routes = childrenType === '[object Array]' ? children : [children];
    
    const targetElement = routes.find(route => route.props.path === location);

    return targetElement;
  }
  ```

  `children`으로 들어오는 컴포넌트가 하나일 경우에는 해당 리액트 엘리먼트가 들어오지만, 여러개일 때는 배열에 감싸져서 들어오기 때문에 하나가 들어오든 여러개가 들어오든 잘 대응할 수 있도록 하기위해 `toString.call()`을 이용해서 타입을 검사하고 배열로 `routes` 변수를 설정합니다.  
  (참고로 실제 react-router 소스코드에서는 첫번째 매칭되는 컴포넌트를 find 메서드로 찾지 않고, forEach 메서드를 이용해서 찾지만 저는 간편하게 구현하기 위해 find를 사용하였습니다)

  이제 \<Switch\>를 App.jsx에 적용합니다.

  ```js
  // App.jsx

  import Router from './react-router/Router';
  import Switch from './react-router/Switch';
  import Route from './react-router/Route';

  export default function App() {
    return (
      <>
        <Navigator />
        <Router>
          <Switch>
            <Route path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/about' component={About} />
          </Switch>
        </Router>
      </>
    );
  }
  ```

  그러면 다음과 같이 첫번째로 매칭되는 하나의 컴포넌트만 잘 출력되는 것을 확인할 수 있습니다.

  ![2](https://user-images.githubusercontent.com/59194356/109265815-7d4c5680-784a-11eb-84e7-767e51f97104.gif)

  이렇게 \<Router\>, \<Switch\>, \<Route\> 컴포넌트를 구현해보았습니다.  
  하지만 지금은 URL을 이동할 때마다 새롭게 페이지가 로드되고 있기 때문에 이를 history API를 사용하여 개선해보도록 하겠습니다.

## useHistory 구현하기

react-router에서는 history 모듈을 사용해서 history 객체를 만들고, 해당 객체를 ContextAPI를 사용하여 자식 컴포넌트들에게 전달함으로써 사용합니다. 따라서 먼저 history 모듈을 간단하게 구현해보도록 하겠습니다.  
  
다음은 제가 [history 모듈의 GitHub 소스코드](https://github.com/ReactTraining/history)를 참고하여 react-router에서 useHistory를 구현하기 위해 필요한 부분만 뽑아서 정말 간단하게 구현해본 코드입니다. (실제 코드는 1000줄이 넘습니다)

  ```js
  // history.js

  export const createHistory = () => {
    const listeners = createEvents();

    const history = {
      listen(listener) {
        const removeListener = listeners.push(listener);
        
        return removeListener;
      },
      push(path) {
        window.history.pushState({ path }, '', path);
        listeners.call(path);
      },
    };

    return history;
  }

  const createEvents = () => {
    let handlers = [];

    return {
      push(func) {
        handlers.push(func);
        
        const removeHandler = () => {
          handlers = handlers.filter(handler => handler !== func);
        };

        return removeHandler;
      },
      call(arg) {
        handlers.forEach(func => func(arg));
      },
    };
  };
  ```
  
  `createEvents`는 간단하게 이벤트 핸들러들을 담아둘 객체를 생성하는 클로저입니다. 
  - `call` 메서드를 사용해서 핸들러 내부의 함수들을 실행시킬 수 있고, `push` 메서드를 사용해서 핸들러에 함수를 등록할 수 있습니다.
  - 특이한점은 `push` 메서드의 반환값으로 해당 함수를 핸들러에서 제거하는 함수를 제공합니다.  

  `createHistory`는 위에서 설명한 `createEvents`함수를 통해 얻은 핸들러객체를 `listeners`라는 변수에 담고, `history` 객체를 생성해서 반환합니다. 
  - `listen` 메서드를 통해서 매개변수로 들어오는 리스너를 등록할 수 있고
  - `push`에서는 history API를 사용하여 클라이언트 라우팅을 수행하게 됩니다. 그리고 Listeners에 등록된 함수들을 실행시킵니다.  

  이제 history 객체를 얻어올 수 있으니 본격적으로 useHistory를 구현해보도록 하겠습니다.  
  아까 RouterContext를 이용해 location 변수를 전달했던 것처럼, HistoryContext를 생성해서 history 객체를 전달하도록 해보겠습니다.

  ```js
  // HistoryContext.jsx

  import { createContext } from "react";

  const HistoryContext = createContext();

  export default HistoryContext;
  ```

  \<BrowserRouter\>를 만들어서 아까 만든 history 모듈을 통해 history 객체를 생성한 뒤 \<Router\>의 props로 전달합니다.

  ```js
  // BrowserRouter.jsx

  import { createHistory } from '../history';

  import Router from './Router';

  export default function BrowserRouter({ children }) {
    const history = createHistory();

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
  ```

  \<Router\>에서는 받아온 history 객체에 상태 변경 로직을 등록합니다.

  ```js
  // Router.jsx

  import RouterContext from './RouterContext';
  import HistoryContext from './HistoryContext';

  export default function Router({ history, children }) {
    const [location, setLocation] = useState(window.location.pathname);

    useEffect(() => {
      const unlisten = history.listen((location) => {
        setLocation(location)
      });

      return () => unlisten();
    });

    useEffect(() => {
      window.addEventListener('popstate', () => {
        const { path } = window.history.state;
        setLocation(path)
      });
    }, []);

    return (
      <RouterContext.Provider value={{ location }}>
        <HistoryContext.Provider value={{ history }}>
          {children}
        </HistoryContext.Provider>
      </RouterContext.Provider>
    );
  }
  ```

  `useEffect` 훅에서 `history.listen`메서드를 호출하여 `location` 상태값을 갱신해주는 로직을 등록합니다. 그럼 이제 history 객체에 `push` 메서드를 호출하게되면 앞서 짰던 로직처럼 history API를 사용해서(`window.history.pushState`) URL을 이동하고, `call` 메서드를 사용하여 등록해놓았던 함수를 호출하게 됩니다. 즉, `location` 상태값이 해당 path로 갱신되고 화면이 재렌더링됩니다.  
  아울러 뒤로가기 버튼에 대해서도 history API가 처리할 수 있도록 역시 `useEffect` 훅으로 `popstate`에 대한 로직도 구현해줍니다.  
  마지막으로 아까 구현했었던 HistoryContext를 사용하여 `children`에게 history 객체를 전달합니다.

  이제 진짜로 useHistory 훅을 구현합니다. 훅 자체는 구현이 어렵지 않습니다.

  ```js
  // useHistory.jsx

  import HistoryContext from './context/HistoryContext';

  const useHistory = () => {
    const { history } = useContext(HistoryContext);

    return history;
  }

  export default useHistory;
  ```

  ContextAPI를 사용하여 history 객체를 디스트럭처링해서 얻어온 뒤 반환합니다.


  마지막으로 App.jsx에 적용합니다.

  ```js
  // App.jsx

  export default function App() {
    return (
      <BrowserRouter>
        <Navigator />
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/about' component={About} />
        </Switch>
      </BrowserRouter>
    );
  }

  function Navigator() {
    const history = useHistory();

    return (
      <>
        <button onClick={() => history.push('/')}>/home</button>
        <button onClick={() => history.push('/login')}>/login</button>
        <button onClick={() => history.push('/about')}>/about</button>
      </>
    );
  }
  ```

  \<Router\>를 \<BrowserRouter\> 컴포넌트로 변경합니다.  
  useHistory 훅을 사용하기 위해서는 \<BrowserRouter\> 내부에 존재해야 하므로 \<Navigator\> 컴포넌트를 \<BrowserRouter\> 내부로 이동시킵니다.  
  \<Navigator\>에서 URL 변경 로직을 useHistory로 변경합니다.

  새로고침 없이 라우터가 잘 동작하는 것을 확인할 수 있습니다.

  ![3](https://user-images.githubusercontent.com/59194356/109270620-a7eddd80-7851-11eb-99a8-a61a246c4c31.gif)

## 마무리

이상으로 react-router를 간단하게 구현해보았습니다.  
부족한 설명 들어주셔서 감사합니다.  
  
해당 소스코드의 전체는 [https://github.com/Woomin-Jeon/custom-react-router](https://github.com/Woomin-Jeon/custom-react-router)에서 확인하실 수 있습니다.
  
[react-router GitHub 소스코드](https://github.com/ReactTraining/react-router)  
[history GitHub 소스코드](https://github.com/ReactTraining/history)
