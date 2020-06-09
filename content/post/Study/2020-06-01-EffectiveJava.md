---
title: Effective Java 기록
date: 2020-06-01
tag: [Study]
---

`참고`  
Effective Java에 나오는 내용들 중 앞으로 제가 Java로 코딩 할 때 숙지하고 싶은 내용들만 추려서 적어놓았습니다. 이해하지 못했거나 아직 저에게 너무 어려운 내용은 아직 정리하지 않았습니다.

<br>

#### (아이템2) 생성자에 매개변수가 많다면 빌더를 고려하라

  ```java
  // 이런 상황에는 빌더를 사용하자
  public class Nutrition {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public Nutrition(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
      this.servingSize = servingSize;
      this.servings = servings;
      this.calories = calories;
      this.fat = fat;
      this.sodium = sodium;
      this.carbohydrate = carbohydrate
    }
  }
  ```

<br>

#### (아이템4) 인스턴스화를 막으려거든 private 생성자를 사용하라

  ```java
  public class Utility {
    private Utility() {}
  }
  ```

<br>

#### (아이템5) 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

  ```java
  // 이렇게 하면 유연성이 안좋아지며, 테스트를 짜기 힘들어진다.
  public class Car {
    private int key = 0;
    Random random = new Random();

    public Car() {
      this.key = random.nextInt();
    }
  }

  // 이렇게 외부에서 주입해주는 게 좋다.
  public class Car {
    private int key = 0;

    public Car(Random random) {
      this.key = random.nextInt();
    }
  }
  ```

<br>

#### (아이템9) try-finally보다는 try-with-resources를 사용하라

  ```java
  // try-finally
  public void getFirstLineOfFile(String path) throws IOExcetion {
    BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
    try {
      return bufferedReader.readLine();
    } finally {
      bufferedReader.close();
    }
  }

  // try-with-resources
  public void getFirstLineOfFile(String path) throws IOExcetion {
    try (
      BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
    ) {
      return bufferedReader.readLine();
    }
  }
  ```

<br>

#### (아이템14) Comparable을 구현할지 고려하라

  알파벳, 숫자, 연대 같이 순서가 명확한 값 클래스를 작성한다면 반드시 Comparable 인터페이스를 구현하라.

<br>

#### (아이템15) 클래스와 멤버의 접근 권한을 최소화하라

  `1` 시스템 개발 속도를 높인다. 여러 컴포넌트를 병렬로 개발할 수 있기 때문이다.  
  `2` 시스템 관리 비용을 찾춘다. 각 컴포넌트를 더 빨리 파악하여 디버깅 할 수 있고, 다른 컴포넌트로 교체하는 부담도 적기 때문이다.  
  `3` 캡슐화 자체가 성능을 높여주지는 않지만, 성능 최적화에 도움을 준다.  
  `4` 소프트웨어 재사용성을 높인다. 외부에 거의 의존하지 않고 독자적으로 동작할 수 있는 컴포넌트라면 컴포넌트와 함께 개발되지 않은 낯선 환경에서도 유용하게 쓰일 가능성이 크기 떄문이다.  
  `5` 큰 시스템을 제작하는 난이도를 낮춰준다. 시스템 전체가 아직 완성되지 않은 상태에서도 개별 컴포넌트의 동작을 검증할 수 있기 때문이다.

<br>

#### (아이템16) public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라

  ```java
  // 이렇게 하면 철저한 객체 지향 프로그래머에게 뺨맞는다
  public class Point {
    public int x;
    public int y;
  }

  // 이렇게 메서드로 접근하도록 해야한다
  public class Point {
    private int x;
    private int y;

    public getX() { return this.x; }
    public getY() { return this.y; }
  }
  ```