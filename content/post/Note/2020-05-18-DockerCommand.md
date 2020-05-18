---
title: "Docker 명령어 모음"
date: 2020-05-18
tag: ["Note"]
---

## Dockerfile로 이미지 빌드하기

```bash
$ docker build -t [Docker Hub ID]/[Image Name]:[version] .
```

## 컨테이너 실행하기

```bash
$ docker run --publish [Local Port Number]:[Docker Port Number] -it --detach --name [New Container Name] [Image Name] /bin/bash
# 참고로 Image Name은 [Docker Hub ID]/[Image Name]:[version]과 같이 설정하는 것이 좋다.
# 예를 들면, dal96k/myImage:v1
```

## 실행중인 컨테이너에 접속하기

```bash
$ docker exec -it [Container ID] /bin/bash
```

## 실행중인 컨테이너 로그 확인하기

```bash
$ docker logs [Container Name]
```

## 컨테이너와 이미지의 목록 확인하고 삭제하기

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

## 추가 사항

```bash
$ fuser -k [Port Number]/tcp
```
