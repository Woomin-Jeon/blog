---
title: "[Java] 익명클래스(Anonymous Class)와 람다(Lambda)"
date: 2020-06-29
category: "All"
draft: true
---

## 익명 클래스란?

일반적으로 인터페이스를 구현하기 위해서는 클래스를 하나 만든 뒤 implements 해주어야 합니다. 하지만, 이 클래스가 일회성이고 재사용할 필요가 없다면 굳이 클래스를 하나 만들어줄 필요가 없습니다. 이 경우 사용하는 것이 익명 클래스입니다. 익명 클래스는 인터페이스를 직접 생성함으로써 만들 수 있습니다.

  <br>

  Conditional 이라는 함수형 인터페이스를 하나 만들었습니다.

  ```java
  public interface Conditional {
    boolean judge(Integer Number);
  }
  ```

  <br>

  그리고 judge 라는 메서드를 구현하여 사용하기 위해 Judgement라는 클래스를 하나 만들고 Conditional 인터페이스를 implements 한 뒤, judge 메서드를 오버라이드 하였습니다.

  ```java
  public class Judgement implements Conditional {
    @Override
    public boolean judge(Integer Number) {
      return Number % 2 == 0;
    }
  }

  Judgement jgmt = new Judgement();
  jgmt.judge(5); // false
  jgmt.judge(4); // true
  ```

  <br>

  하지만 저는 단지 judge라는 메서드 하나만 사용하고자 하는데 클래스를 새로 하나 만들어야 하는 것은 너무 번거럽습니다.  
  이 때, 익명 클래스가 등장합니다.

  ```java
  Conditinal c = new Conditional() {
    // @Override
    public boolean judge(Integer Number) {
      return Number % 2 == 0;
    }
  }

  c.judge(5); // false
  c.judge(4); // true
  ```

<br><br>

## 예제

매개변수로 들어오는 numbers라는 List에서 짝수만을 더해주는 메서드 sumEven을 만들어보겠습니다.

  ```java
  public int sumEven(List<Integer> numbers) {
    int total = 0;
    for (int number : numbers) {
      if (number % 2 == 0) {
        total += number;
      }
    }
    return total;
  }
  ```

  <br>

  이 sumEven 메서드를 익명 클래스의 메서드를 받아서 if 조건을 확인하는 방식으로 변경해보겠습니다. 이 때, 익명 클래스는 앞서 사용했던 Conditional 인터페이스를 구현한 것으로 사용하겠습니다.

  ```java
  public int sumEven(List<Integer> numbers, Conditional c) {
    int total = 0;
    for (int number : numbers) {
      if (c.judge(number)) {
        total += number;
      }
    }
    return total;
  }
  ```

  <br>

  그럼 이제 sumEven 메서드를 한번 사용해보도록 하겠습니다.

  ```java
  List<Integer> numbers = List.of(1, 2, 3, 4, 5);

  sumEven(numbers, new Conditional() {
    // @Override
    public boolean judge(Integer Number) {
      return Number % 2 == 0;
    }
  }); // 6
  ```

  <br>

  그런데 이것도 너무 번잡스럽지 않으신가요?

<br><br>

## 람다 표현식의 활용

람다 표현식은 함수형 인터페이스 자리에 쓰일 수 있는데 살짝 보니 Conditional이 함수형 인터페이스인 것 같습니다. 람다표현식을 사용해서 위의 익명 클래스를 대체해보도록 하겠습니다.  
참고로 함수형 인터페이스란 추상메서드가 1개 뿐인 인터페이스를 말합니다.

  ```java
  List<Integer> numbers = List.of(1, 2, 3, 4, 5);

  sumEven(numbers, (number) -> number % 2 == 0); // 6;
  ```

  훨씬 간결해진 모습을 보실 수 있습니다.
