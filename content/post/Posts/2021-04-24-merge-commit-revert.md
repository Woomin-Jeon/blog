---
title: "[Git] Merge commit Revert 하기"
date: 2021-04-24
tag: ["Posts"]
---

<br><br>

## 작성 동기

<s>글의 주제에 있어서 그렇게 중요한 부분은 아니기에 안읽고 본론만 읽으셔도 무방합니다</s><br>
  
저희 팀에서는 브랜치를 `master(production) - develop(alpha) - feat(feature)`의 흐름으로 관리하고 있습니다. 그래서 develop 브랜치에 모아두었다가 master에 merge 하여 production 배포를 진행하는데, 이번에 develop에 있는 커밋 중 아직 production에 배포돼서는 안되지만 그 위에 얹어진 커밋은 배포해야되는 상황이 있었습니다. 즉 develop 브랜치는 아래와 같은 상황이었습니다.  
`previous commits < A commit < A merge commit < B commit < B merge commit`  
이러한 상황속에서 A가 작성한 커밋들은 아직 프로덕션에 나가선 안되었기에 A의 커밋은 모두 빼고 B 커밋만 남겨야 했습니다.  
이 때, 제가 생각했던 방법은 reset을 사용해서 `previous commits`의 상태로 가고, 거기에 `B commit`을 붙여서 production 배포를 진행한 뒤, 다시 `A commit`을 붙이고자 하였습니다. 즉, 다음과 같은 수순을 생각했습니다.  
  
(reset 으로 되돌림)  
`previous commits`  
(rebase로 B commit을 붙이고 배포 진행)  
`previous commits < B commit < B merge commit`  
(rebase로 A commit을 다시 붙임)  
`previous commits < A commit < A merge commit < B commit < B merge commit`  
  
결과적으로는 이 방법으로 해결은 했습니다. 하지만 로컬에서 reset을 사용하여 커밋들을 자르다보니 remote에 올릴 때 충돌이 생기게되어 force push를 계속 하게되었고, 이로인해 실수가 생기면 remote에 있는 코드에 문제가 생길 위험이 너무 컸습니다. 아울러 commit의 순서가 바뀌는 등 부작용도 있어서 다음부터는 revert를 사용하기로 결심했고, 이에 대해 공부와 실습을 해보았습니다.

<br>

## Revert란?

revert는 reset과 마찬가지로 어떤 커밋을 없애는 역할을 합니다. 그런데 reset은 아예 해당 커밋이 없던 시점으로 돌아가는 것에 비해, revert는 해당 커밋을 없앤 버전의 새로운 커밋을 만든다는 점에서 다릅니다. 그렇기 때문에 로컬에서 revert를 하게되면 reset과 달리 remote에 push 해도 충돌이 발생하지 않습니다.  
예를들어 다음과 같은 커밋이 remote에 존재한다고 할때,  
`commit 1(a1a1a1) < commit 2(b2b2b2) < commit 3(c3c3c3)`
여기서 `commit 3`을 제거하고자 하는 상황이라고 가정해봅니다.  

local에서 reset을 사용하게 되면 

```
$ git reset --hard c3c3c3
$ git log
  --------------------------------------------
  commit b2b2b2
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    commit 2

  commit a1a1a1
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    commit 1
  --------------------------------------------
$ git push origin master -f
```

이렇게 `commit 3`가 완전히 사라지게 되고, remote에는 `commit 3`가 존재하기 때문에 충돌로 인해 push 할 수 없어서 force push를 해야하게 됩니다.
  
<br>
  
반면, revert를 사용하게 되면

```
$ git revert c3c3c3
$ git log
  --------------------------------------------
  commit d4d4d4
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    Revert "commit 3"

  commit c3c3c3
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    commit 3

  commit b2b2b2
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    commit 2

  commit a1a1a1
  Author: Woomin-Jeon <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 00:13:01 2021 +0900

    commit 1
  --------------------------------------------
$ git push origin master
```

이렇게 `commit 3`이 제거된 버전을 `Revert commit`이 가지게 되어 remote에 충돌 없이 push 할 수 있게됩니다.  
추후 다시 `commit 3`이 존재하는 상태로 돌리고 싶다면 revert commit을 다시 revert하면 됩니다.  

```
$ git revert d4d4d4
```

<br>

## Merge commit Revert 하기

그럼이제 다시 본론으로 돌아와보면, merge commit은 하나 이상의 parent를 갖게됩니다. 그렇기 때문에 그냥 revert 명령어만 사용하면 어떤 parent를 기준으로 revert 해야하는지 알 수 없기 때문에 추가적으로 `-m`옵션을 통해 어떤 parent를 기준으로 revert 해줄 지 명시해주어야 합니다.

앞서 작성 동기에서 설명했던 예시에서,  
`previous commits < A commit < A merge commit < B commit < B merge commit`  

A merge commit을 되돌리고자 하는 것으로 해보겠습니다.    
  
먼저 `git log` 명령어를 통해 A merge commit을 살펴보면,  

```
$ git log
  --------------------------------------------
  commit a2a2a2
  Merge: p1p1p1 a1a1a1
  Author: raff <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 15:48:35 2021 +0900

    Merge branch 'A'
  --------------------------------------------
```

이렇게 Merge라는 필드가 하나 더 있고 거기에 parent commit의 id인 `p1p1p1(previous commits)`과 `a1a1a1(A commit)`이 적혀있게 됩니다.  
여기서 우리는 merge된 A가 작성한 커밋들을 모두 revert하고 싶은 것이므로 previous commits인 `p1p1p1`을 기준으로 잡고 revert를 해야합니다.  
`p1p1p1`은 Merge 필드의 첫번째 commit id 이므로, 다음과 같은 명령어를 통해 revert를 진행합니다.  
(참고로 A merge commit의 id는 `a2a2a2`입니다)

```
$ git revert a2a2a2 -m 1
$ git log
  --------------------------------------------
  commit r1r1r1
  Author: raff <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 15:48:35 2021 +0900

    Revert "Merge branch 'A'"

  commit a2a2a2
  Merge: p1p1p1 a1a1a1
  Author: raff <Woomin-Jeon@gmail.com>
  Date:   Sat Apr 24 15:48:35 2021 +0900

    Merge branch 'A'
  --------------------------------------------
```

이렇게 revert된 버전의 commit이 하나 더 생성되고, A의 merge commit과 merge commit에 들어있던 commit들은 모두 사라지게 됩니다.  

<br>

## 마치며

따라서, 앞선 작성 동기에 제가 겪었던 문제는 Revert를 통해 A merge commit을 제거하고, production에 배포를 진행한 뒤, Revert했던 commit을 다시 Revert 해줌으로써 해결할 수 있었을 것 같습니다. 앞으로는 더 안전하고 예측가능한 Revert를 사용하는 습관을 갖도록 해야겠습니다.

<br><br>
