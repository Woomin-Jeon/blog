---
title: "Docker 명령어 모음"
date: 2020-05-18
category: "All"
draft: true
---

<br />

#### Dockerfile로 이미지 빌드하기

```bash
$ docker build -t [Docker Hub ID]/[Image Name]:[version] .
```

<br />

#### 컨테이너 실행하기

```bash
$ docker run --publish [Local Port Number]:[Docker Port Number] -it --detach --name [New Container Name] [Image Name] /bin/bash
# 참고로 Image Name은 [Docker Hub ID]/[Image Name]:[version]과 같이 설정하는 것이 좋다.
# 예시 : docker run --publish 7070:7070 -it --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook:latest /bin/bash

# 환경변수를 주입해서 실행하려면,
# --env-file ./env.list
# 예시 : docker run --env-file /home/ubuntu/.env --publish 7070:7070 -it --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook:latest /bin/bash

# "--restart=[option]" docker가 죽는 경우 재가동시키는 옵션이다.
# --restart=no: container를 재시작 시키지 않는다. (default)
# --restart=on-failure[:max-retries]: container가 정상적으로 종료되지 않은 경우(exit code가 0이 아님)에만 재시작 시킨다. max-retries도 함께 주면 재시작 최대 시도횟수를 지정할 수 있고, 테스트 서버 등과 같은 리모트에 설정하면 좋을 것 같다.
# --restart=always: container를 항상 재시작시킨다. exit code 상관 없이 항상 재시작 된다.
# --restart=unless-stopped: container를 stop시키기 전까지 항상 재시작 시킨다.
# 예시 : docker run --env-file /home/ubuntu/.env --publish 7070:7070 -it --restart=unless-stopped --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook:latest /bin/bash
```

<br />

#### 실행중인 컨테이너에 접속하기

```bash
$ docker exec -it [Container ID] /bin/bash
```

<br />

#### 실행중인 컨테이너 로그 확인하기

```bash
$ docker logs [Container Name]
```

<br />

#### 컨테이너와 이미지의 목록 확인하고 삭제하기

```bash
# 현재 돌아가는 컨테이너의 목록 확인
$ docker ps

# 모든 컨테이너의 목록 (죽은 것 포함) 확인
$ docker ps -a

# 이미지 목록 확인
$ docker images

# 가동중인 컨테이너 내리기
$ docker stop [Container ID]

# 죽은 컨테이너 삭제하기
$ docker rm [Container ID]

# 이미지 삭제하기
$ docker rmi [Image ID]

# 죽은 컨테이너 재가동하기
$ docker container start [Container Name]
```

<br />

#### 추가 사항

```bash
$ fuser -k [Port Number]/tcp
```
