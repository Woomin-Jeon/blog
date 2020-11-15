---
title: "MySQL 노트"
date: 2020-09-28
tag: ["Note"]
---

<br>

## 간편 명령어

  ```bash
  # DB 생성
  mysql> CREATE DATABASE example_db;

  # DB 조회
  mysql> SHOW DATABASES;

  # DB 선택
  mysql> USE example_db;

  # DB 삭제
  mysql> DROP DATABASE example_db;

  # 테이블 생성
  mysql> CREATE TABLE example_user (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(64),
    name VARCHAR(64),
    password VARCHAR(64),
    comment TEXT,
    start_date DATETIME
  );

  # 테이블 조회
  mysql> DESC user;

  # 테이블 필드 추가
  mysql> ALTER TABLE table ADD newColumn varchar(255);

  # 테이블 필드 제거
  mysql> ALTER TABLE table DROP COLUMB newColumn;
  ```

<br>

## 기본적인 CRUD 명령어

  INSERT

  ```js
  const query = `INSERT INTO user (id, password) VALUES(?, ?)`;
  connection.query(query, [id, password], (error, rows, fields) => {...});
  ```

  SELECT

  ```js
  const query = `SELECT id, password FROM user WHERE name=?`;
  connection.query(query, [name], (error, rows, fields) => {...});
  ```
  
  UPDATE

  ```js
  const query = `UPDATE user SET name=? where id=?`;
  connection.query(query, [newName, id], (error, rows, fields) => {...});
  ```

  DELETE

  ```js
  const query = `DELETE FROM user WHERE id=?`;
  connection.query(query, [id], (error, rows, fields) => {...});
  ```

## 유틸 명령어

  MAX / MIN / SUM / COUNT

  ```sql
  -- MAX : user 테이블에서 age 컬럼 중 가장 큰 것
  SELECT MAX(age) FROM user;

  -- MIN : user 테이블에서 age 컬럼 중 가장 작은 것
  SELECT MAX(age) FROM user;

  -- SUM : user 테이블에서 age의 총 합
  SELECT SUM(age) FROM user;

  -- COUNT : user 테이블에서 age 컬럼의 수
  SELECT COUNT(age) FROM user;
  ```

  DISTINCT / IS NOT NULL

  ```sql
  -- 중복이 없으며 null 값이 아닌 것에 대한 개수
  SELECT COUNT(DISTINCT age) FROM user WHERE age IS NOT NULL;
  ```

  GROUP BY / HAVING / ORDER BY

  ```sql
  -- 남자그룹과 여자그룹의 사람 수
  SELECT id, COUNT(id) FROM user GROUP BY sex;

  -- 남자그룹과 여자그룹중 성인인 사람의 수
  SELECT id, COUNT(id) FROM user GROUP BY sex HAVING(age > 20);

  -- 남자그룹과 여자그룹중 성인인 사람의 수를 남자-여자 순서로 정렬
  SELECT id, COUNT(id) FROM user GROUP BY sex HAVING(age > 20) ORDER BY sex ASC;
  ```
  
## JOIN 명령어

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

## MySQL 원격 접속을 위한 설정

MySQL을 설치하면 기본적으로 로컬(localhost)에서만 접속이 가능하고 외부에서는 접속이 불가능하게 되어 있습니다. 아울러 root 계정은 로컬에서만 접속 가능합니다. 따라서 다른 계정에 접속을 허용해주고, 이 계정을 통해 원격 접속을 해야합니다.

  ```sql
  GRANT ALL PRIVILEGES ON *.* TO '아이디'@'%' IDENTIFIED BY '패스워드';
  ```

## Prepared statements

Prepared statements를 사용하면 SQL Injection과 같은 보안상의 문제를 해결할 수 있으므로 권장됩니다.  

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

## Connection Pool

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

## Transaction

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

## Index

- 어떤 특정한 쿼리에서 조회하는데 시간이 아주 많이 걸린다거나 데이터베이스 성능이 몹시 중요한 서비스를 진행할 때 인덱스가 중요합니다.
- 컬럼에 인덱스를 적용하게되면, SELECT는 빨라지지만 UPDATE나, INSERT, DELETE는 느려집니다.
- 인덱스는 성능을 높여줄 수 있지만 잘못 사용하게되면 오히려 성능저하를 유발하기 때문에 주의해야 합니다. 이러한 인덱스의 특성을 이용해 간단한 규칙을 정의하면,  
인덱스는 자주 조회되는 컬럼에 대해 적용하고, 조회 시 오랜 시간을 소모하는 컬럼에 적용하며, URL 같이 데이터가 긴 경우에는 인덱스를 사용하지 않습니다.
- Primary키를 기반으로 조회를 하게 되면 가장 고속으로 데이터를 가져올 수 있습니다. Primary키는 테이블 전체를 통틀어 중복되지 않는 값을 가지며, 테이블마다 딱 한 개의 Primary키를 가질 수 있습니다.

    ```sql
    SELECT * FROM student WHERE id=3;
    ```

- Unique키를 기반으로 조회를 하면 역시 고속으로 데이터를 가져올 수 있습니다. Unique키는 앞선 Primary키처럼 테이블 전체를 통틀어 중복되지 않는 값을 지정해야 하지만, 테이블에 여러 개의 Unique키를 지정할 수 있습니다.

    ```sql
    SELECT * FROM student WHERE school_number=10;
    ```

- Normal키를 기반으로 조회를 하면 앞선 Primary 키나 Unique키에 비해 느린 속도로 데이터를 가져옵니다. Normal키는 중복을허용하며, 역시 여러 개의 Normal키를 지정할 수 있습니다.

    ```sql
    SELECT * FROM student WHERE major='경영학과';
    ```

## ERD

- Entity, Attribute, Relationship으로 구성되는데 Entity를 나누는 기준은 계층 관계로 나타나는 시점입니다. 예를들어, "글"이라는 Entity를 설정하고 그 안에 Attribute로 "제목, 내용, 글쓴이, 댓글"을 설정합니다. 그런데 생각해보니 댓글이라는 Attribute는 댓글을 작성한 사람과 날짜 등의 정보가 또 들어가야 합니다. 이때 관계형 데이터베이스에서는 "글"이라는 Entity의 Attribute를 "제목, 내용, 글쓴이, 댓글(내용, 작성자, 날짜)"로 설정하는 것이 아니라, "댓글"이라는 Entity를 새로 만들어주고 이를 "글"과 연결(relationship) 해주는 것입니다.
- Key  
  Attribute 중 식별자가 될 수 있는 키의 후보들을 `후보키(Candidate Key)`라고 하며, 이메일, 주민등록번호, 고유 아이디 등등이 가능합니다.  
  그리고 이 후보키들 중 우리가 정한 식별자를 `기본키(Primary Key)`라고 합니다.  
  또한, 이 후보키들 중 기본키가 되지 못한 나머지 키들을 `대체키(Alternate Key)`라고 합니다.  
  외래키는 외래에 있는 테이블과 연결할 수 있는 열쇠로, "A" Entity(Table)에서 "B" Entity(Table)의 기본키(Primary Key)를 가지고 있다면 "A" Entity에 있는 "B"의 Primary Key를 `외래키(Foreign Key)`라고 합니다. 즉 관계형 데이터베이스에서의 relationship은 외래키와 기본키가 연결됨으로써 완성됩니다.  
  참고 사항으로 고유하지 않은 Attribute 여러개를 합쳐서 고유한 키를 만들 수 있다면(예, Email + 전화번호) 이 키들을 `중복키(Composite Key)`라고 합니다.
