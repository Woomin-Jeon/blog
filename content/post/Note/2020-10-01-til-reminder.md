---
title: "TIL 복습할 내용"
date: 2020-10-01
tag: ["Note"]
---

### NodeJS Best Practice

[https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices)

### IaaS, PaaS, SaaS

- IaaS(Infrastructure as a Service)는 쉽게 말해서 위의 3가지 중 가장 사용자의 자율성이 높은 서비스입니다. 사용자는 그냥 컴퓨터 리소스를 빌려서 이를 자신이 원하는대로 가공하여 사용합니다.
- PaaS(Platform as a Service)는 IaaS보다는 사용자가 덜 자율적입니다. DB 또는 어플리케이션 서버 등 개발환경과 관련된 서비스를 제공합니다.
- SaaS(Software as a Service)는 그냥 소프트웨어 그 자체를 제공하는 걸 말합니다. 네이버 클라우드 같은 것이 이에 속합니다.

### Helmet

Helmet은 HTTP 헤더를 적절히 재설정해서 보안성을 높이는 라이브러리입니다. Helmet에 옵션을 넣으면 여러가지를 보호할 수 있지만, 옵션없이도 기본적으로 X-Powered-By 헤더는 사용하지 않도록 해줍니다.

### Gzip

Gzip이란, 서버에서 패킷을 압축시켜서 클라이언트로 전송하는 하고, 이 Gzip을 사용할 수 있는 브라우저가 이를 풀어서 원본 데이터를 받게 되는 것을 말합니다. 이 Gzip을 사용하면 패킷의 크기를 70% 이상 줄일 수 있어서 데이터 전송의 효율에 있어서 좋습니다. 그리고 이 Gzip을 express에서 사용하도록 하는 라이브러리가 Compression입니다.

### CDN

CDN이란, 느린 응답속도와 다운로딩 타임을 극복하기 위한 기술입니다. 기본적으로 사용자가 원격지에 있는 서버(Origin Server)로 부터 Content(예. Web Object, Video, Music, Image, Document 등)를 다운로드 받을때 가까이 있는 서버에서 받는 것보다 시간이 오래 걸리므로, 사용자와 가까운 곳에 위치한 Cache Server에 해당 Content를 저장(캐싱)하고 Content 요청시에 Cache Server가 응답을 주는 기술입니다.

### Express-session

- secure 속성: 쿠키를 생성했을 때, 브라우저는 HTTPS가 아닌 통신에서는 쿠키를 전송하지 않는 것을 말합니다.
- http-only 속성: 쿠키는 클라이언트에서 자바스크립트 코드로 조회할 수 있기 때문에, 해커들은 자바스크립트로 쿠키를 가로채고자 시도를 하게 됩니다. 가장 대표적인 공격 중 하나가 Cross Site Scripting입니다. 이러한 Cross Site Scripting 취약점을 해결하는 방법은, 바로 브라우저에서 쿠키에 접근할 수 없도록 제한하는 것입니다. 이러한 역할을 하는 것이 바로 http-only입니다.

### axios withCredential 옵션

CORS에서는 기본적으로 쿠키를 request headers에 넣어주지 않기 때문에, axios에 { withCredentials: true } 옵션을 넣어줌으로써 request headers에 쿠키를 넣을 수 있습니다. withCredentials는 서버에서도 response headers에 쿠키를 넣을지 말 지 정하는 옵션이기도 합니다. 즉, withCredentials 옵션은 쿠키를 보낼지 말지에 관한 것으로 볼 수 있습니다. 주의해야할 점은, withCredentials가 true라면 Access-Control-Allow-Origin을 와일드카드(*)가 아니라 직접 url을 설정해 주어야 한다는 것에 유의해야합니다.

### GitHub Action

[https://www.dahae.kim/blog/github-actions-cicd/](https://www.dahae.kim/blog/github-actions-cicd/)

### DockerFile

Dockerfile의 ENTRYPOINT와 CMD의 차이는 ENTRYPOINT는 컨테이너 실행 시 필수적으로 실행되는 것이며, CMD는 컨테이너 실행 시 다른 옵션을 주입하면 대체됩니다. 그렇기 때문에 CMD를 사용하면 컨테이너 외부에서 명령을 실행시킬 수 있다는 장점이 있습니다.

### CSS flex-wrap

CSS flex-wrap property는 flex-item 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는 속성입니다.

### 클래스, 오브젝트, 인스턴스

- 클래스는 타입의 구현 메커니즘입니다.
- 객체는 타입의 인스턴스입니다.
- 즉, 객체의 타입을 구현하는 메커니즘 중 하나로 클래스를 사용합니다.

### JavaScript class에서 private 사용하는 방법

ES2019에서 나온 해쉬(#) prefix를 통해 JavaScript class에서도 private을 선언할 수 있게 되었습니다.

  ```javascript
  class Employee {
    #taxRate

    constructor(name, salary) {
      this.name = name;
      this.salary = salary;
      this.#taxRate = 10;
    }

    getSalary = () => {
      return this.salary * this.#getTaxRate();
    }

    #getTaxRate = () => {
      return (100 - this.#taxRate) / 100;
    }
  }

  const employee = new Employee('woomin', 3000);
  const salary = employee.getSalary(); // 2700

  employee.taxRate; // undefined
  employee.#taxRate;
  // SyntaxError: Private field '#taxRate' must be declared in an enclosing class
  employee.getTaxRate();
  // TypeError: employee.getTaxRate is not a function
  ```

### 디바운스(Debounce)
  
디바운스란 짧은 시간 동안 동일한 이벤트가 많이 발생할 경우 이를 전부 처리하지 않고 처음 또는 마지막에 발생한 이벤트에 대해 한번만 처리하는 것으로 프론트엔드 성능 최적화에 큰 도움을 주는 기능 중 하나입니다. 특히 추천 검색어 기능과 같은 것을 사용할 때유용한 것 같습니다. 다음 코드는 클로저를 사용한 디바운스입니다.  

  ```javascript
  const debounce = (func, wait) => {
    let setTimeoutID = null;
  
    return () => {
      clearTimeout(setTimeoutID);
      setTimeoutID = setTimeout(func, wait);
    }
  }
  ```

  이제 이 디바운스 함수가 잘 동작하는 지 확인해보록 하겠습니다.

  ```javascript
  const execute = debounce(() => console.log('디바운스 실행'), 1000);
  
  (async () => {
    execute(); // (1)
    await sleep(500); // 0.5초 대기
    execute(); // (2)
    execute(); // (3)
  })();
  ```

- (1)을 실행합니다. setTimeout이 돌아가면서 1초 후 "디바운스 실행" 출력할 것입니다.  
- sleep 함수에서 0.5초를 대기합니다.  
- (2)를 실행합니다. (1)의 setTimeout이 마저 돌지 않았는데 (2)가 호출되어 clearTimeout으로 (1)의 setTimeout을 초기화시킵니다.이는 클로저를 사용하여 setTimeoutID 라는 변수를 서로 공유하기 때문에 가능합니다. 따라서 (1)은 콘솔을 출력하지 못하고 clear됩니다.  
- (3)을 실행합니다. 마찬가지로 1초가 지나지 않았는데 바로 호출되었으므로 (2)의 setTimeout을 clear시켜버립니다. 그 뒤로 호출되는함수가 없으므로 마저 1초를 기다린 뒤 "디바운스 실행" 콘솔로그를 출력합니다.  
- 즉, 최종적으로 마지막까지 실행되는 함수는 (3)입니다.

### JavaScript 프로토 타입의 contructor

인스턴스가 가지고 있는 \_\_proto\_\_ 에 존재하는 constructor는 자신을 생성한 생성자 함수를 나타냅니다. 그렇기 때문에 아래와같은 것이 가능합니다.

  ```javascript
  const Example = class {
    constructor(name) {
      this.name = name;
    }
  }

  const ex1 = new Example('apple');
  const ex1Proto = Object.getPrototypeOf(ex1);
  const ex2 = new ex1Proto.constructor('banana');
  const ex3 = new ex1.__proto__.constructor('mango');
  const ex4 = new ex1.constructor('berry'); // __proto__ 는 생략 가능한 프로퍼티
  ```

### 튜플타입을 매개변수로 넘길 때

이 때는 미리 풀어서 무슨 의미를 갖는 튜플 값인지 명시해주는 게 좋습니다.

  ```js
  const dateInfo = [2020, 9, 11 ];
  
  const getDaysOfWeek = (dateInfo) => {...} // X
  const getDaysOfWeek = ([year, month, day]) => {...} // O
  ```

### Promise가 담긴 배열을 동기적으로 처리하는 방법

프로미스가 담긴 배열을 동기적으로 처리하기 위해서는 일반적인 for문이나 forEach문으로는 불가능합니다. 다음과 같은 thenable한 방식이 유효합니다.

  ```js
  arr.reduce((previousPromise, item) => {
    return previousPromise.then(() => item())
  }, Promise.resolve());
  ```

### MySQL prepared statements

prepared statements를 사용하면 SQL Injection과 같은 보안상의 문제를 해결할 수 있으므로 권장됩니다.  

  ```js
  connection.query(`INSERT INTO USER (id, password) VALUES('${id}', '${password}')`);
  // 이와같은 쿼리문은 지양합니다.
  
  connection.query(`INSERT INTO USER (id, password) VALUES(?, ?)`, [id, password]);
  connection.query(`SELECT password FROM USER WHERE userid=? `, [id]);
  // 이처럼 기존의 값을 넣었던 곳에 "?"를 삽입하고
  // 배열로 주입해줍니다.
  
  connection.query(`SELECT * FROM USER`);
  // 이와 같이 "*"을 이용하는 것도 지양합니다.
  // 모르는 사람 입장에서 무엇을 가져오는지 한번에 알 수 없습니다.
  ```

### MySQL Connection Pool

Connection Pool이란 데이터베이스와 연결된 커넥션을 미리 지정해둔 개수(connectionLimit)만큼 만들어놓은 뒤 Pool에 보관하다가 필요할 때마다 가져가서 사용한 뒤 반환(release)하는 방법입니다. 이렇게 하면 사용자 수가 몰렸을 때, 바로바로 커넥션을 제공할 수 있으며, 만약 커넥션을 모두 소진하여 없다면 다 쓴 사용자가 반환했을 때 그 커넥션을 다시 다른 사람에게 기다린 순서대로 건네주는 방식으로 동작합니다. 이처럼 Connection Pool을 사용하면 데이터베이스의 부하를 줄이며 유동적으로 연결을 관리할 수 있으며, 계속 커넥션을 맺었다가 끊었다가 맺었다가 끊었다가와 같은 불필요한 상황을 방지할 수 있다는 장점이 있습니다. NodeJS에서의 사용 방법은 다음과 같습니다.

  ```js
  const mysql = require('mysql');

  const pool = mysql.createPool({
    host: process.env.DB_HOST_IP,
    user: process.env.DB_ID,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 20, // default 10
  });

  pool.getConnection((err, connection) => {
    connection.query(`SELECT id FROM USER`, (error, rows, fields) => {...});
    connection.release(); // 사용후엔 반드시 반환 해주어야 합니다.
  });
  ```

### MySQL Transaction

MySQL에서는 트랜잭션을 간단히 만들 수 있습니다.

  ```bash
  START TRANSACTION;
  ROLLBACK;
  COMMIT;
  ```

  으로 사용할 수 있습니다. 트랜잭션을 시작하고자 할 때는 START TRANSACTION으로 시작함을 알리고, 뒤에 쿼리문을 넣습니다. 그리고 조건 하에서 이전 상태로 ROLLBACK을 시키거나 COMMIT을 통해 상태 변경을 수용할 수 있습니다. NodeJS에서의 사용 방법 역시 간단합니다.

  ```js
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction(); // 트랜잭션 시작

    await connection.query(...);
    await connection.query(...);
    await connection.query(...);

    await connection.commit(); // 에러가 없으면 변경 내용 수용
  } catch(err) {
    await connection.rollback(); // 에러가 발생하면 이전 상태로 롤백
  } finally {
    connection.release(); // 커넥션 반납
  }
  ```

### 브라우저 렌더링 엔진의 동작과정

- HTML 파싱 > DOM 트리 구축 > 렌더 트리 구축 > 렌더 트리 배치 > 렌더 트리 그리기
- DOM 트리 구축을 위해 HTML 파싱을 진행하며,
- 렌더 트리 구축을 위해 스타일에 대한 계산을 진행합니다.
- 그리고 이 구축된 렌더 트리를 화면 상 어떻게 배치할 것인지에 대해 진행하고,
- 최종적으로 렌더 트리를 그리게됩니다.
- 참고로, 브라우저의 HTML 파서가 \<script\> 태그를 만나면, 스크립트가 실행되며, 그 동안 문서의 파싱은 중단됩니다. 스크립트가 외부에 있는 경우 우선 네트워크로부터 자원을 가져와야 하는데 이 또한 실시간으로 처리되고 자원을 받을 때까지 파싱은 중단됩니다. 만약 \<script\> 태그의 속성으로 async를 넣게되면 위의 처리를 비동기로 진행하게 됩니다.

### 이벤트 위임(Event delegation)은 언제 써야하는가?

node 엘리먼트를 클릭하면 'hello'를 출력하고, app 엘리먼트를 더블클릭하면 node를 제거하는 코드입니다.

  ```js
  const app = document.createElement('div');
  const node = document.createElement('div');
  app.appendChilde(node);

  const consoleEvent = () => console.log('hello');
  const nodeRemoveEvent = () => app.removeChild(node));
  node.addEventListener('click', consoleEvent);
  app.addEventListener('dblclick', nodeRemoveEvent);
  ```

  여기서 만약 node를 더블클릭하게되면 node element는 제거됩니다. 하지만 node에 걸린 'click'에 대한 이벤트리스너는 제거되지 않아 메모리 누수가 발생합니다. 그러므로 엘리먼트를 제거할 때는 그와 관련된 이벤트리스너도 같이 제거해주어야 합니다.

  ```js
  node.removeEventListener('click', consoleEvent);
  ```

  하지만 이처럼 매번 제거대상에 대한 이벤트를 제거해주기는 쉽지 않으며 빠트릴 위험이 있습니다. 이러한 문제점을 쉽게 해결할 수 있는 방법이 이벤트 위임입니다.

### CSS 애니메이션

처음으로 CSS 애니메이션에 대해 공부해보았는데 간단한 작업은 그렇게 어렵진 않았습니다. 현재 제게 필요한 애니메이션 기능은 메뉴 버튼을 눌렀을 때 슬라이드로 나오는 것인데 이에 대해 필요한 것들은 다음과 같습니다.

- `@keyframes` 키워드를 사용하여 애니메이션 효과를 지정할 수 있습니다. 이 키워드 다음에는 해당 애니메이션의 이름을 적습니다.
- `animation-name` 을 통해 앞선 @keyframes에서 지정한 이름의 애니메이션을 엘리먼트에 적용할 수 있습니다.
- `animation-duration` 속성을 통해 애니메이션의 최대 지속시간을 지정할 수 있습니다. 예를 들어 0% ~ 100%까지의 duration을 1초로 주면 1초 내로 0% ~ 100% 까지의 애니메이션이 완료되며, duration을 10초로 주면 1초에 10% 씩 진행됩니다.
- `animation-iteration-count` 속성을 통해 애니메이션을 몇 번 반복시킬 지 정할 수 있습니다. 값으로 infinite를 사용하면 무한으로 반복됩니다.
- `animation-fill-mode` 속성으로 애니메이션이 끝났을 때의 엘리먼트 위치를 지정해줄 수 있습니다. 값으로 none, forward, backward, both를 지정할 수 있으며, 제가 슬라이드 애니메이션을 사용하기에는 딱 슬라이드되어 나온 뒤 그 자리에 멈춰있어야하므로, 즉 엘리먼트가 애니메이션이 끝난 지점의 위치를 그대로 수용해야하므로 forward가 어울립니다.

아래는 이에 대한 코드입니다. 이렇게 하면 가로세로 100px 짜리 정사각형이 색을 바꾸며 이동한 뒤 멈춥니다.  

  ```css
  div {
    position: absolute;
    width: 100px;
    height: 100px;

    animation-name: moving;
    animation-duration: 5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes moving {
    0%   { left: 0px;   background: yellow; top: 0px;   }
    25%  { left: 0px;   background: blue;   top: 300px; }
    50%  { left: 300px; background: pink;   top: 300px; }
    75%  { left: 300px; background: black;  top: 0px;   }
    100% { left: 600px; background: yellow; top: 0px;   }
  }
  ```

### 인터럽트

운영체제는 자원을 효율적으로 관리해야 합니다. 이를 위해 폴링(Polling)이라는 것을 사용했는데 이는 일적한 시간 간격을 두고 주기적으로 자원들의 상태를 살펴보는 방법을 말합니다. 자원들의 상태가 지금 바뀌든 아예 바뀌지 않든 무조건 정해진 시간에만 확인해야하는 비 효율성이 있어서 지금은 대체로 사용하지 않습니다. 지금 사용하는 방법은 인터럽트입니다. 인터럽트는 각 자원들이 능동적으로 자신의 상태를 CPU에게 알리는 방식입니다. 이를 통해 무언가 상황이 발생하면 바로바로 CPU에게 알릴 수 있으며 상황이 발생하지 않으면 가만히 있으므로 CPU가 폴링에 비해 따로 시간을 들이지 않도록 합니다.  
CPU의 인터럽트는 다음과 같은 방식으로 처리됩니다.  
  
1. 인터럽트 발생
2. CPU는 그 시각 처리중인 명령어를 마무리 함
3. CPU는 그 시각 실행중이던 프로그램을 잠시 중단하고 시스템 스택에 프로그램의 현 상태를 저장(PSW, PC 등)
4. 인터럽트 처리 루틴의 시작 주소를 PC에 넣음
5. 인터럽트 처리 루틴 실행
6. 인터럽트 처리가 끝나면 3번에서 저장해두었던 프로그램의 상태들을 원 위치에 넣어줌
7. 기존의 프로그램을 다시 실행하여 이어감

### element.insertAdjacentElement('position', 'target')

insertAdjacentElement를 사용하면 돔의 위치를 변경할 수 있습니다.  
position은 총 4가지가 있습니다.

- beforebegin: element 앞에 붙임
- beforeend: element의 안에 가장 마지막 child로 붙임
- afterbegin: element의 안에 가장 첫번째 child로 붙임
- afterend: element 뒤에 붙임

### document.elementFromPoint(x, y)

elementFromPoint를 이용하여 해당 좌표에 맞는 돔을 찾을 수 있습니다. 예제는 다음과 같습니다.

  ```js
  window.addEventListener('mousemove', (event) => {
    const { pageX, pageY } = event; // 현재 마우스의 좌표 값
  
    const targetElement = document.elementFromPoint(pageX, pageY);
    console.log(targetElement);
  });
  ```

### ERD

- Entity, Attribute, Relationship으로 구성되는데 Entity를 나누는 기준은 계층 관계로 나타나는 시점입니다. 예를들어, "글"이라는 Entity를 설정하고 그 안에 Attribute로 "제목, 내용, 글쓴이, 댓글"을 설정합니다. 그런데 생각해보니 댓글이라는 Attribute는 댓글을 작성한 사람과 날짜 등의 정보가 또 들어가야 합니다. 이때 관계형 데이터베이스에서는 "글"이라는 Entity의 Attribute를 "제목, 내용, 글쓴이, 댓글(내용, 작성자, 날짜)"로 설정하는 것이 아니라, "댓글"이라는 Entity를 새로 만들어주고 이를 "글"과 연결(relationship) 해주는 것입니다.
- Key  
  Attribute 중 식별자가 될 수 있는 키의 후보들을 `후보키(Candidate Key)`라고 하며, 이메일, 주민등록번호, 고유 아이디 등등이 가능합니다.  
  그리고 이 후보키들 중 우리가 정한 식별자를 `기본키(Primary Key)`라고 합니다.  
  또한, 이 후보키들 중 기본키가 되지 못한 나머지 키들을 `대체키(Alternate Key)`라고 합니다.  
  외래키는 외래에 있는 테이블과 연결할 수 있는 열쇠로, "A" Entity(Table)에서 "B" Entity(Table)의 기본키(Primary Key)를 가지고 있다면 "A" Entity에 있는 "B"의 Primary Key를 `외래키(Foreign Key)`라고 합니다. 즉 관계형 데이터베이스에서의 relationship은 외래키와 기본키가 연결됨으로써 완성됩니다.  
  참고 사항으로 고유하지 않은 Attribute 여러개를 합쳐서 고유한 키를 만들 수 있다면(예, Email + 전화번호) 이 키들을 `중복키(Composite Key)`라고 합니다.

### MySQL JOIN

- `기본`  
  topic 테이블의 모든 정보를 가져옵니다.

    ```sql
    SELECT * FROM topic;
    ```

- `LEFT JOIN`  
  topic 테이블을 다 가져오는데 이를 LEFT에 붙이고, TOPIC의 author_id(외래키)와 AUTHOR의 aid(기본키)를 바탕으로 이에 매칭되도록 author 테이블을 오른쪽에 붙이고자 합니다. RIGHT JOIN은 LEFT JOIN과 같은데 테이블을 기준으로 왼쪽에 붙이는 것입니다.

    ```sql
    SELECT * FROM topic
    LEFT JOIN author ON topic.author_id = author.aid;
    ```

- `INNER JOIN`  
  LEFT JOIN과 쓰는 방법은 동일합니다. 이 역시 topic 테이블에 AUTHOR를 붙인다는 것인데, LEFT JOIN과 다른 점은 NULL인 값에 대해서는 제거한다는 뜻입니다. 즉, TOPIC과 author 테이블의 필드들 중 하나라도 NULL이면 이는 포함되지 않습니다.

    ```sql
    SELECT * FROM topic
    INNER JOIN author ON topic.author_id = author.aid;
    ```
  
- `FULL OUTER JOIN`  
  자주 사용하지는 않는 JOIN입니다. FULL OUTER JOIN은 LEFT JOIN과 RIGHT JOIN한 결과를 합쳐서 중복을 제거한 것입니다.

    ```sql
    SELECT * FROM topic
    FULL OUTER JOIN author ON topic.author_id = author.aid;
    ```

    하지만 몇몇 MySQL에서는 FULL OUTER JOIN을 지원하지 않아서, UNION이라는 키워드를 활용해 LEFT JOIN과 RIGHT JOIN을 합쳐 주는 방식으로 쿼리를 만듭니다. 참고로 UNION에는 중복 제거 (DISTINCT)가 내포되어있습니다.

    ```sql
    (SELECT * FROM topic
    LEFT JOIN author ON topic.author_id = author.aid)
    UNION
    (SELECT * FROM topic
    RIGHT JOIN author ON topic.author_id = author.aid);
    ```

<!-- 2020.10.01 TIL부터 진행 -->
