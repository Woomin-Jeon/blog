---
title: "포스팅하기엔 작고, TIL에 쓰기엔 큰 것들에 대한 노트"
date: 2020-09-28
tag: ["Note"]
---

## NodeJS Best Practice

[https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices](https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices)

## IaaS, PaaS, SaaS

- IaaS(Infrastructure as a Service)는 쉽게 말해서 위의 3가지 중 가장 사용자의 자율성이 높은 서비스입니다. 사용자는 그냥 컴퓨터 리소스를 빌려서 이를 자신이 원하는대로 가공하여 사용합니다.
- PaaS(Platform as a Service)는 IaaS보다는 사용자가 덜 자율적입니다. DB 또는 어플리케이션 서버 등 개발환경과 관련된 서비스를 제공합니다.
- SaaS(Software as a Service)는 그냥 소프트웨어 그 자체를 제공하는 걸 말합니다. 네이버 클라우드 같은 것이 이에 속합니다.

## Helmet

Helmet은 HTTP 헤더를 적절히 재설정해서 보안성을 높이는 라이브러리입니다. Helmet에 옵션을 넣으면 여러가지를 보호할 수 있지만, 옵션없이도 기본적으로 X-Powered-By 헤더는 사용하지 않도록 해줍니다.

## Gzip

Gzip이란, 서버에서 패킷을 압축시켜서 클라이언트로 전송하는 하고, 이 Gzip을 사용할 수 있는 브라우저가 이를 풀어서 원본 데이터를 받게 되는 것을 말합니다. 이 Gzip을 사용하면 패킷의 크기를 70% 이상 줄일 수 있어서 데이터 전송의 효율에 있어서 좋습니다. 그리고 이 Gzip을 express에서 사용하도록 하는 라이브러리가 Compression입니다.

## CDN

CDN이란, 느린 응답속도와 다운로딩 타임을 극복하기 위한 기술입니다. 기본적으로 사용자가 원격지에 있는 서버(Origin Server)로 부터 Content(예. Web Object, Video, Music, Image, Document 등)를 다운로드 받을때 가까이 있는 서버에서 받는 것보다 시간이 오래 걸리므로, 사용자와 가까운 곳에 위치한 Cache Server에 해당 Content를 저장(캐싱)하고 Content 요청시에 Cache Server가 응답을 주는 기술입니다.

## Express-session

- secure 속성: 쿠키를 생성했을 때, 브라우저는 HTTPS가 아닌 통신에서는 쿠키를 전송하지 않는 것을 말합니다.
- http-only 속성: 쿠키는 클라이언트에서 자바스크립트 코드로 조회할 수 있기 때문에, 해커들은 자바스크립트로 쿠키를 가로채고자 시도를 하게 됩니다. 가장 대표적인 공격 중 하나가 Cross Site Scripting입니다. 이러한 Cross Site Scripting 취약점을 해결하는 방법은, 바로 브라우저에서 쿠키에 접근할 수 없도록 제한하는 것입니다. 이러한 역할을 하는 것이 바로 http-only입니다.

## axios withCredential 옵션

CORS에서는 기본적으로 쿠키를 request headers에 넣어주지 않기 때문에, axios에 { withCredentials: true } 옵션을 넣어줌으로써 request headers에 쿠키를 넣을 수 있습니다. withCredentials는 서버에서도 response headers에 쿠키를 넣을지 말 지 정하는 옵션이기도 합니다. 즉, withCredentials 옵션은 쿠키를 보낼지 말지에 관한 것으로 볼 수 있습니다. 주의해야할 점은, withCredentials가 true라면 Access-Control-Allow-Origin을 와일드카드(*)가 아니라 직접 url을 설정해 주어야 한다는 것에 유의해야합니다.

## GitHub Action

[https://www.dahae.kim/blog/github-actions-cicd/](https://www.dahae.kim/blog/github-actions-cicd/)

## DockerFile

Dockerfile의 ENTRYPOINT와 CMD의 차이는 ENTRYPOINT는 컨테이너 실행 시 필수적으로 실행되는 것이며, CMD는 컨테이너 실행 시 다른 옵션을 주입하면 대체됩니다. 그렇기 때문에 CMD를 사용하면 컨테이너 외부에서 명령을 실행시킬 수 있다는 장점이 있습니다.

## CSS flex-wrap

CSS flex-wrap property는 flex-item 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정하는 속성입니다.

<!-- TODO: 07.29부터 작성 -->
