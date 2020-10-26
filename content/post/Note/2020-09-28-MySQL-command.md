---
title: "MySQL 명령어 모음"
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
