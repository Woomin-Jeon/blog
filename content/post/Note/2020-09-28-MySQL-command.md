---
title: "MySQL 명령어 모음"
date: 2020-09-28
tag: ["Note"]
---

<br />

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
