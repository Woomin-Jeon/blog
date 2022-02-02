---
title: 웹을 지탱하는 기술 스터디 2
date: 2020-02-26
category: "All"
draft: true
---

## "웹을 지탱하는 기술" 스터디 2

1. POST의 용도 3가지를 설명하시오. (141~145p)  
  =  
  (1) 서버 리소스의 작성  
  (2) 리소스에 데이터 추가
  (3) 다른 메서드로는 대응할 수 없는 처리
  
2. 리소스 작성시 POST와 PUT 중에 POST를 쓰는게 적절한 이유는 무엇인가? (149p)  
  = POST로 리소스를 작성하게 되면, URI의 결정권은 서버에 있게 된다. 반면 PUT으로 리소스를 작성하게 되면 리소스의 URI는 클라이언트가 결정하게 된다. 즉, 클라이언트가 리소스의 URI를 결정할 수 있다는 것은 클라이언트를 만드는 프로그래머가 서버의 내부구현을 숙지하고 있어야한다는 의미이며 더 문제가 발생하기 쉽다는 뜻이다. 그러므로 POST를 사용하는 것이 바람직하다.
  
3. HEAD의 사용 용도는 무엇인가? (151p)  
  = HEAD 메서드는 리소스의 헤더만을 취득하는 메서드이다. 이를 통해 네트워크 대역을 절약하면서 리소스의 크기를 조사하거나 리소스의 갱신일자를 구분할 수 있다.
  
4. 다음 요청과 응답의 의미는 각각 무엇인가? (152p)  
  .........................................................................  
  요청  
  OPTIONS /list/item1 HTTP/1.1  
  Host: Example.com  
  .........................................................................  
  응답  
  HTTP/1.1 200 OK  
  Allow: GET, HEAD, PUT, DELETE  
  .........................................................................  
  = OPTIONS 헤더는 내가 사용할 수 있는 메서드가 무엇이 있는지 알려달라는 뜻이며,  
  이에 대한 응답으로 Allow헤더에서 GET, HEAD, PUT, DELETE가 사용 가능하다고 말하고 있다.
  
5. 멱등성, 안전에 대해서 각각 설명하시오. (157p)  
  = 멱등성이란 '어떤 조작을 몇 번을 반복해도 결과가 동일한 것'을 의미한다.  
  안전이란 '조작 대상의 리소스 상태를 변화시키지 않는 것'을 의미한다.
  
6. 멱등성과 안전을 기준으로 GET, HEAD, PUT, DELETE, POST를 분류하시오. (158p)  
  =  
  GET, HEAD -> 멱등, 안전  
  PUT, DELETE -> 멱등  
  POST -> X  
  
7. GET을 바르게 이용하고 있는지 판단하는 기준은 무엇인가? (164p)  
  = GET 실행 전후, 리소스에 변경이 가해져 있는지 여부를 확인한다. 변경이 있어서는 안된다(안전).
  
8. 현재 토마토 가격은 100원이다. PUT으로 토마토 가격을 갱신할 때 다음 PUT 사용은 어떤 부분이 잘못됐는가? 또한 올바른 표현은 무엇인가? (165~167p)  
  .........................................................................  
  PUT /tomato HTTP/1.1  
  Host: example.com  
  Content-Type: text/plain; charset=utf-8  
　  
  +50  
  .........................................................................  
  = +50을 하게되면 다음번에는 200, 250, 300으로 멱등하지 않게된다.  
  그냥 고정값 150으로 해주는 것이 바람직하다.
  
9. 스테이터스 코드 1xx, 2xx, 3xx, 4xx, 5xx의 분류와 의미를 설명하시오. (173~174p)  
  =  
  1xx : 처리중  
  2xx : 성공  
  3xx : 리다이렉트  
  4xx : 클라이언트 에러  
  5xx : 서버 에러  
  
10. 스테이터스 코드에서 첫 번째 숫자를 이용한 분류 방식의 장점을 설명하시오. (174~175p)  
  = 클라이언트는 첫 번째 숫자만 보고도 대충 서버가 어떤 응답을 보낸 것인지 이해할 수 있게 되며, 어떻게 처리할 지 큰 가닥을 잡을 수 있게 된다.
  
11. 다음 응답 코드의 문제점은 무엇인가? (189p)  
  .........................................................................  
  HTTP/1.1 200 OK  
  Content-Type: application/xml  
　  
  `<error>`  
    `<code>`1001`</code>`  
    `<message>`file not found`</message>`  
  `</error>`  
  .........................................................................  
  = 스테이터스 코드를 오용하고 있다. 바디에서 에러메시지를 출력하고 있음에도 스테이터스 코드로는 200을 반환하고 있다.

12. HTTP에서 기술되는 일시는 어떤 표준시를 따르는가? (196p)  
  = GMT
  
13. UTF-8로 선언된 xml 문서의 경우 Content-Type 헤더에 들어갈 알맞은 값은 무엇인가? (200~201p)  
  = Content-Type: application/xml; charset=utf-8
  
14. Content Negotiation이란 무엇인가? (202p)  
  = 콘텐트 네고시에이션이란, 미디어 타입이나 문자 인코딩, 언어 태그 등을 서버가 일방적으로 결정하는 것이 아니라 클라이언트와 협상(Negotiation)을 통해 결정하는 것을 말한다. 이에는 Accept 헤더 필드를 통해 우선순위를 정해주는 것이 수반된다.
  
15. 다음 2개의 메시지에 있는 10은 각각 몇 바이트인가? (205~206p)  
  .........................................................................  
  Content-Length: 10  
  Transfer-Encoding: chunked  
  Content-Type: Text/plain; charset=utf-8  
　    
  10  
  The brow fox ju  
  .........................................................................  
  = Content-Length에 있는 10은 10진수이기 때문에 그냥 10이고, 바디에 있는 10은 청크 사이즈인데, 청크사이즈는 16진수이기 때문에 저 10은 16을 나타낸다.
  
16. WWW-Authenticate: Basic realm="Example.com 를 클라이언트 입장에서 해석하시오. (207~208p)  
  = WWW-Authenticate 헤더에 의해 클라이언트는 서버가 제공하는 인증 방식을 알 수 있는데, 위에서는 Basic 인증이라는 것을 알 수 있다.
  
17. URI Space를 설정하는 이유는 무엇인가? (208p)  
  = URI Space란 URI에서 패스 이하를 가리키는 것으로, 위의 WWW-Authenticate 헤더의 realm에서 서버 상에 이 리소스가 속한 공간을 가리키기 위해 사용된다.
  
18. SSL/TLS에서 제공하는 3가지 기능에 대해서 설명하시오. (211p)  
  = 도청 방지(암호화), 위장 방지(인증), 변조 방지(변경 감지)
  
19. Expires와 Cache-Control의 유효기간 표시법 차이는 무엇인가? (221p)  
  = Expires에 비해 Cache-Control을 이용하면 더욱 상세하고 복잡한 지정을 할 수 있다.
  
20. 조건부 GET If-Modified-Since 와 If-None-Match 은 어떻게 구분하여 사용하는가? (226p)  
  = ETag를 이용하여 구분한다.
  
21. Pipelining이란 무엇인가? (227p)  
  =  
  `Keep Alive 이전`  
  "연결 - req - res - 해제" - "연결 - req - res - 해제"  
  `Keep Alive 이후`  
  "연결 - req - res - req - res - 해제"  
  `파이프라인화`  
  "연결 - req req - res res - 해제"
  