---
title: Effective Java 기록
date: 2020-06-01
tag: [Study]
---

`참고`  
Effective Java에 나오는 내용들 중 앞으로 제가 Java로 코딩 할 때 숙지하고 싶은 내용들만 추려서 요약 하였습니다. 이해하지 못했거나 아직 제게 너무 어려운 내용은 정리하지 않았습니다.

<br>

#### (아이템 01) 생성자 대신 정적 팩터리 메서드를 고려하라

  `1` 정적 팩터리 메서드를 사용하면 이름을 가질 수 있다. 반환될 객체의 특성을 쉽게 묘사할 수 있다.  
  `2` 호출될 때마다 인스턴스를 새로 생성하지는 않아도 된다. 불필요한 갹체 생성을 피할 수 있다.  
  `3` 반환 타입의 하위타입 객체를 반환할 수 있는 능력이 있다. 반환할 객체의 클래스를 유연하며 자유롭게 선택할 수 있게 된다.  
  `4` 입력 매개변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.  
  `5` 정적 팩터리 메서드를 작성하는 시점에는 반환할 객체의 클래스가 존재하지 않아도 된다.

<br>

#### (아이템 02) 생성자에 매개변수가 많다면 빌더를 고려하라

  ```java
  // 이렇게 매개변수가 많은 상황에는 빌더를 사용하자
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

#### (아이템 03) private 생성자나 열거 타입으로 싱글턴임을 보증하라

  싱글턴이란 인스턴스를 오직 하나만 생성할 수 있는 클래스를 말한다. 이때, 생성을 단 한번만 할 수 있도록 보증하기 위해서 생성자를 private으로 선언하라는 뜻인 것 같다.

<br>

#### (아이템 04) 인스턴스화를 막으려거든 private 생성자를 사용하라

  ```java
  public class Utility {
    private Utility() {}
  }
  ```

<br>

#### (아이템 05) 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

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

#### (아이템 09) try-finally보다는 try-with-resources를 사용하라

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

#### (아이템 14) Comparable을 구현할지 고려하라

  알파벳, 숫자, 연대 같이 순서가 명확한 값 클래스를 작성한다면 반드시 Comparable 인터페이스를 구현하라.

<br>

#### (아이템 15) 클래스와 멤버의 접근 권한을 최소화하라

  `1` 시스템 개발 속도를 높인다. 여러 컴포넌트를 병렬로 개발할 수 있기 때문이다.  
  `2` 시스템 관리 비용을 찾춘다. 각 컴포넌트를 더 빨리 파악하여 디버깅 할 수 있고, 다른 컴포넌트로 교체하는 부담도 적기 때문이다.  
  `3` 캡슐화 자체가 성능을 높여주지는 않지만, 성능 최적화에 도움을 준다.  
  `4` 소프트웨어 재사용성을 높인다. 외부에 거의 의존하지 않고 독자적으로 동작할 수 있는 컴포넌트라면 컴포넌트와 함께 개발되지 않은 낯선 환경에서도 유용하게 쓰일 가능성이 크기 떄문이다.  
  `5` 큰 시스템을 제작하는 난이도를 낮춰준다. 시스템 전체가 아직 완성되지 않은 상태에서도 개별 컴포넌트의 동작을 검증할 수 있기 때문이다.

<br>

#### (아이템 16) public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라

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

<br>

#### (아이템 20) 추상클래스 보다는 인터페이스를 우선하라

  기존 클래스 위에 새로운 추상 클래스를 끼워 넣기는 어려운 게 일반적이다. 두 클래스가 같은 추상 클래스를 확장하길 원한다면, 그 추상 클래스는 계층구조상 두 클래스의 공통 조상이어야 한다. 이 때문에 새로 추가된 추상 클래스의 모든 자손이 적절하지 않은 상황에서도 이를 상속하게 되는 문제가 발생한다. 하지만 기존 클래스에 인터페이스를 구현해 넣는 것은 정말 간단하다. 인터페이스가 요구하는 메서드를 아직 없다면 추가하고, 클래스 선언에 implementes 구문만 추가하면 된다.

<br>

#### (아이템 34) int 상수 대신 열거 타입을 사용하라

  열거 타입은 일정 개수의 상수 값을 정의한 다음, 그 외의 값은 허용하지 않는 타입이다. 사계절, 태양계의 행성, 카드게임의 카드 종류 등이 좋은 예다. Java에서는 열거타입을 지원하지 전에는 다음 코드처럼 정수 상수를 한 묶음 선언해서 사용하곤 했다.

  ```java
  public static final int APPLE_FUJI = 0;
  public static final int APPLE_PIPPIN = 1;
  public static final int APPLE_GRANNY = 2;
  
  public static final int ORANGE_NAVEL = 0;
  public static final int ORANGE_TEMPLE = 1;
  public static final int ORANGE_BLOOD = 2;
  ```

  이를 Enum 열거 타입으로 사용하자.

  ```java
  public enum Apple { FUJI, PIPPIN, GRANNY }
  public enum Orange { NAVEL, TEMPLE, BLOOD }
  ```

  `추가` 열거 타입은 싱글턴을 일반화 한 형태라고 볼 수 있으며, 싱글턴은 원소가 하나뿐인 열거 타입이라고 할 수 있다.

<br>

#### (아이템 35) ordinal 메서드 대신 인스턴스 필드를 사용하라

  열거 타입의 상수와 연결된 정숫값이 필요하면 다음과 같이 ordinal 메서드를 이용하고 싶은 유혹에 빠진다.

  ```java
  public enum Todo {
    ADD, MODIFY, COMPLETE, DELETE, EXIT;

    public int getOption() { return ordinal() + 1; }
  }
  ```

  하지만 이렇게 만들면 유지보수하기가 끔찍해진다. 상수 선언 순서를 바꾸는 순간 getOption이 오작동 하며, 이미 사용중인 정수와 값이 같은 상수는 추가할 방법이 없다. 또한, 중간에 값을 비워둘 수도 없다.  
  해결 방법은 열거 타입의 상수와 연결된 정수값은 인스턴스 필드에 저장하는 것이다.

  ```java
  public enum Todo {
    ADD(1), MODIFY(2), COMPLETE(3), DELETE(4), EXIT(0);

    private final int optionNumber;

    Todo(int option) {
      this.optionNumber = option;
    }

    public int getOption() {
      return this.optionNumber;
    }
  }
  ```

<br>

#### (아이템 40) @Override 애너테이션을 일관되게 사용하라

  @Override 애너테이션을 달면 메서드에 문제가 생겼을 경우 잘못된 부분을 명확하게 컴파일러가 알려준다. 그러므로 상위 클래서의 메서드를 재정의하려는 모든 매서드에 @Override 애너테이션을 다는 습관을 가지도록하자.

<br>

#### (아이템 42) 익명 클래스보다는 람다를 사용하라

  ```java
  // 익명 클래스 사용
  Collections.sort(words, new Comparator<String>() {
    public int compare(String a, String b) {
      return a.length() - b.length();
    }
  });

  // 람다 사용
  Collections.sort(words, (a, b) -> a.length() - b.length());
  ```

<br>

#### (아이템 43) 람다보다는 메서드 참조를 사용하라

  거의 대부분의 경우에 메서드 참조가 가독성이 좋다.

<br>

#### (아이템 45) 스트림은 주의해서 사용하라

  스트림은 코드를 가독성있고 간편하게 바꿔주지만 남용하면 유지보수 뿐만아니라 장점이었던 가독성 부분에서도 손해를 볼 수 있다. 그렇기 때문에 처음부터 스트림을 과도하게 사용하기보다는 리팩터링을 해서 스트림으로 바꾼 코드가 나아보일 때만 반영하도록 한다.  
  
  스트림은 다음과 같은 상황에서 안성맞춤이다.
  
  1. 원소들의 시퀀스를 일관되게 변환한다.
  2. 원소들의 시퀀스를 필터링한다.
  3. 원소들의 시퀀스를 하나의 연산을 사용해 결합한다.
  4. 원소들의 시퀀스를 컬렉션에 모은다.
  5. 원소들의 시퀀스에서 특정 조건을 만족하는 원소를 찾는다.

<br>

#### (아이템 47) 반환 타입으로는 스트림보다 컬렉션이 낫다

  Collection 인터페이스는 Iterable의 하위 타입이고 stream 메서드도 제공하므로 반복과 스트림을 동시에 지원한다. 따라서 원소 시퀀스를 반환하는 공개 API의 반환 타입에는 Collection이나 그 하위 타입을 쓰는 게 일반적으로 최선이다. Arrays 역시 Arrays.asList와 Stream.of 메서드로 손쉽게 반복과 스트림을 지원할 수 있다. 반환하는 시퀀스의 크기가 메모리에 올려도 안전할 만큼 작다면 ArrayList나 HashSet 같은 표준 컬렉션 구현체를 반환하는 게 최선일 수 있다. 하지만 단지 컬렉션을 반환한다는 이유로 덩치 큰 시퀀스를 메모리에 올려서는 안된다.

<br>

#### (아이템 49) 매개변수가 유효한지 검사하라

  이 아이템은 "오류는 가능한 빨리 발생한 곳에서 잡아야 한다"는 일반 원칙과 부합한다. 메서드 몸체가 실행되기 전에 매개변수를 확인한다면 잘못된 값이 넘어왔을 때 즉각적이고 깔끔한 방식으로 예외를 던질 수 있다.  
  Java 7에 추가된 java.util.Objects.requireNonNull 메서드는 유연하고 사용하기 편하므로, 더 이상 null 검사를 수동으로 하지 말고 이용하도록 하자. 반환값은 무시하고 그냥 필요한 곳 어디서든 순수한 null 검사 목적으로 사용해도 된다.

<br>

#### (아이템 50) 적시에 방어적 복사본을 만들라

  다른 클래스로부터의 침범이 생기면 우리들의 불변식이 깨질 수 있기 때문에 항상 적절치 않은 사용자들로부터 클래스를 보호하려는 데 충분한 시간을 투자하는 것이 좋다.  
  앞선 (아이템 49)에서 매개변수의 유효성을 검사하기 전에 방어적 복사본을 만들고, 이 복사본으로 유효성 검사를 해야한다.

<br>

#### (아이템 51) 메서드 시그니처를 신중히 설계하라

  메서드 이름을 신중히 짓는다.  
  편의 메서드를 너무 많이 만들지 않는다.  
  매개변수 목록은 짧게 유지한다. 4개 이하가 좋다.  
