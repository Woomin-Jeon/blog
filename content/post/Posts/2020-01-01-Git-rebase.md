---
title:  "「Git」 Rebase"
date: 2020-01-04
tag: ["Posts"]
---


먼저, 당신은 지금 어떤 프로그램을 동료들과 함께 개발하는 중이라고 가정해보자.

메인파일에 대한 권한을 가지고 있는 프로젝트장(maintainer)을 중심으로 당신과 동료들은 개발을 할 것이다.
그리고 당신은 파일은 수정사항이나 추가한 후 "내가 몇몇 파일을 수정하고 추가 하였으니까 이걸 합쳐주세요" 하고 프로젝트장에게 요청할 것이다.
이후 프로젝트장은 당신의 파일들을 살펴보고 합쳐도 될지 판단한 후 괜찮다면 메인파일에 합칠(merge) 것이다.
하지만 만약에 같은 파일에 대해서 당신과 동료가 각각 다르게 수정을 하였고 이를 그냥 메인파일에 합치게 된다면, 충돌이 발생해서 메인파일에 문제가
생기게 된다. 그렇기 때문에 프로젝트장은 당신에게 'Rebase'를 하여 다시 파일을 push 하라고 요청할 것이다.

그렇다면 rebase란 무엇일까?  
rebase는 말 그대로 base(기반)을 re(다시) 한다는 것을 의미한다.  
예를 들어, 최초로 당신이 메인파일 A,B,C를 clone 하여 당신의 로컬로 가져올 경우, 이때의 base는 A,B,C가 되게 된다.
이때, 당신의 동료가 새로운 파일 X1,X2를 push 하였고, 프로젝트장이 이를 받아들였다면 메인프로젝트가 있는 공용레퍼지토리의 base는
A,B,C,X1,X2가 되게 된다. 하지만 당신은 clone 하여 A,B,C 만을 가져왔고, 당신의 로컬에서 base는 A,B,C 뿐이기 때문에 당신이
새로 추가하고자하는 파일 Y는 push 하게될 경우 동료가 추가한 파일 X1,X2와 충돌의 위험이 있게된다.
그렇기 때문에 당신은 다시 공용레퍼지토리의 파일을 fetch 하여 X1,X2를 당신의 로컬 base에 추가하고 그 base 위에다가 새로운 파일 Y을 얹어야 한다.
여기서 fetch 하여 내 베이스였던 A,B,C 위에 X1,X2를 올리는 과정을 rebase라고 하며 이와 같은 일련의 과정은 'rebase'라는 명령문으로 진행할 수 있다.
이렇게 rebase가 마쳐진 후에는 내 로컬 base가 A,B,C,X1,X2 로 바뀌게 되며, 거기에 내 파일 Y를 추가하여 최종적으로
A,B,C,X1,X2,Y 를 push 하게 된다. 그리고 이렇게 push 된 파일은 메인파일과의 충돌 위험이 없기 때문에 프로젝트장은 당신의 파일을 merge 할 것이다.

<br>

아래는 위의 내용을 그림으로 보기 쉽게 정리한 것이다.<br><br><br>
![git_rebase](https://user-images.githubusercontent.com/59194356/71762673-9642cb80-2f15-11ea-9fbf-08a9c9867668.PNG)
<br><br>

이와같이 git은 파란색 선과 빨간색 선을 거치며 순환 한다.


<br><br><br>
그렇다면 이런 내용을 명령어로 옮겨보겠다.

1. 먼저 공용레퍼지토리의 파일을 github페이지에서 fork 하여 내 레퍼지토리로 복사한다.
2. 그리고 나의 프로젝트 directory에서 'git init'
3. 'git clone [내 레퍼지토리의 SSH 주소]' - 내 레퍼지토리에 존재하는 프로젝트 파일을 로컬로 가져온다.
4. 'git remote add upstream [공용 레퍼지토리의 SSH 주소]' - 이후에 rebase를 하기위해 remote를 추가한다. origin에는 내 주소, upstream에는 팀 주소
5. 'git remote -v' - upstream과 origin이 알맞게 서로다른 주소를 참조하고 있는지 확인.
6. 'git checkout -b [내가 쓰고싶은 branch 이름] - PR(Pull Request)시에 내가 commit 한 내용임을 알리기 위한 것.
7. 파일에 대한 추가나 변경 작업 여기서 실시.
8. 'git add .'
9. 'git commit' - 추가, 변경된 파일에 대한 commit.
10. 'git push origin [아까 만든 나의 branch 이름]' - 추가, 변경된 파일을 내 레퍼지토리에 push 한다.
11. github페이지에 가서 PR을 요청한다. - 이후 maintainer가 수용하면 내 파일이 merge 된다.

여기까지는 아직 공용레퍼지토리 base의 내용이 변경되거나 추가된 사항이 없는 경우이다.
만약, base가 변경되었다면,

1. 'git checkout master' - master branch로 이동.
2. 'git pull --rebase upstream master' - 공용 레퍼지토리의 수정 사항을 fetch 하는 것.
3. 파일에 대한 추가나 변경 작업 여기서 실시.
4. 'git add .'
5. 'git commit'
6. 'git push origin [아까 만든 나의 branch 이름]'
7. 아까와 같이 다시 github페이지에서 PR을 요청한다.


이상 Git에서 rebase가 무엇인지 알아보고, 그 중요성을 확인하였다.