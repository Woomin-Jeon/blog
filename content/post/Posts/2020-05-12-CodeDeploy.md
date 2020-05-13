---
title: 「Deploy」 CodeDeploy로 자동배포 해보기
date: 2020-05-12
tag: [Posts]
---

## CodeDeploy 사용하기

  참고 : [jojoldu님의 블로그 게시글](https://jojoldu.tistory.com/281)을 참고했다. 와중에 조금 바뀐 부분이나 내가 삽질을 했던 부분에 대해 추가하여 포스팅한다.

  1. AWS IAM으로 이동해서 새로운 그룹을 하나 생성한다.
     - 그룹 이름 설정
     - 정책 설정 (넘어간다)
     - 검토 (확인)
  2. 생성한 그룹의 "권한" 탭으로 이동해서 "인라인 정책"을 펼친 후 "여기"를 클릭한다.
  3. "사용자 지정 정책"을 선택한 뒤 다음 JSON코드를 붙여넣는다.

      ```javascript
      {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "autoscaling:*",
                    "codedeploy:*",
                    "ec2:*",
                    "lambda:*",
                    "elasticloadbalancing:*",
                    "s3:*",
                    "cloudwatch:*",
                    "logs:*",
                    "sns:*"
                ],
                "Resource": "*"
            }
        ]
      }
      ```
  
  4. 생성한 그룹에 사용자를 추가한다.
  5. EC2에 접속해서 aws-cli를 설치하고, 설정을 시작한다.

      ```code
      $ apt-get update
      $ apt install awscli
      $ aws configure
      -----------------------
      AWS_ACCESS_KEY 입력
      AWS_SECRET_ACCESS_KEY 입력
      Default region name 입력 (ap-northeast-2)
      Defalut output format 입력 (json)
      ```
  
  6. 설정이 완료되었다면 CodeDeploy Agent를 설치한다.

      ```code
      $ wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
      $ chmod +x ./install
      $ apt-get install ruby
      $ ./install auto
      ```
  
  7. 설치가 완료되었는지 확인해본다.

      ```code
      $ service codedeploy-agent status
      => The AWS CodeDeploy agent is running as PID ****
      ```
  
  8. EC2 인스턴스가 부팅되면 자동으로 AWS CodeDeploy Agent가 실행될 수 있도록 /etc/init.d/에 쉘 스크립트 파일을 하나 생성하고 아래 내용을 추가한다. 그리고 실행 권한을 추가한다.

      ```code
      $ apt-get install vim
      $ vim /etc/init.d/codedeploy-startup.sh
      ```

      ```code
      #!/bin/bash 
      echo 'Starting codedeploy-agent' 
      sudo service codedeploy-agent restart
      ```
  
      ```code
      $ chmod +x /etc/init.d/codedeploy-startup.sh
      ```

  9. 배포할 프로젝트 파일의 루트에 appspec.yml 파일을 추가한다. AWS CodeDeploy는 이 파일을 통해서 어떤 파일들을 어느 위치로 배포하고 이후 어떤 스크립트를 실행 시킬 것인지 모두 관리한다.

      ```code
      version: 0.0
      os: linux
      files:
        - source:  /
          destination: /home/ec2-user/build/
      ```

  10. EC2에 /home/ec2-user/build/ 디렉토리를 생성한다.

      ```code
      $ mkdir /home/ec2-user/build/
      ```

  11. AWS IAM으로 이동해서 역할을 생성한다.
      - "AWS 서비스" 선택
      - 서비스로 "CodeDeploy" 선택
      - "연결된 권한 정책" (넘어간다)
      - "검토"에서 역할 이름과 역할 설명 작성  

  12. AWS CodeDeploy로 이동하여 애플리케이션을 생성한다.
      - 애플리케이션 이름 작성
      - 컴퓨팅 플랫폼 (EC2/온프로미스)

  13. 해당 애플리케이션의 배포그룹을 생성한다.
      - 배포그룹 이름 입력
      - 서비스 역할 입력 (아까 작성하였던 것)
      - 배포 유형 (현재 위치)
      - 환경 구성 (Amazon EC2 인스턴스)
        - key: Name
        - value: 원하는 대로
        - (현재 상태에서는 0개의 일치하는 고유 인스턴스라고 뜰 것이다.)
  
  14. AWS EC2 instance로 이동하여 "태그" 탭 클릭 후, 태그를 아까 적어놓았던 key, value로 설정한다.
  15. 이제 1개의 일치하는 고유 인스턴스라고 뜰 것이다. 로드밸런서는 할줄 모르니까 설정하지 않는다.
  16. 해당 애플리케이션으로 이동해서 "배포" 탭에서 "배포만들기"를 한다.
      - 배포 그룹 설정
      - 개정 유형 (애플리케이션을 GitHub에 저장)
      - GitHub 토큰 이름을 알아서 작성하고 GitHub와 연결
      - 해당 레포지토리의 이름과 가장 최근 커밋 ID를 작성
      - "콘텐츠 옵션"으로 "배포 실패" 선택
      - 롤백 비활성화
  17. 여기까지가 Local에서 작성한 코드를 GitHub에 push하였을 때, 그 코드를 EC2에 아까 설치하였던 CodeDeploy Agent가 받아와서 EC2안에 설치하는 과정이다.