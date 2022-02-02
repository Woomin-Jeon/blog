---
title: "[Java] equals와 hashCode의 오버라이드"
date: 2020-07-01
tag: ["Posts"]
---

## equals

Age라는 클래스를 하나 생성하겠습니다.

  ```java
  public class Age {
    private int age;

    public Age(int age) {
      this.age = age;
    }

    public int getAge() {
      return this.age;
    }
  }
  ```

그리고 Age의 인스턴스를 두 개 생성합니다.

  ```java
  Age case1 = new Age(10);
  Age case2 = new Age(10);
  
  case1.equals(case2); // false
  ```

여기서 case1과 case2는 각각 다른 객체입니다. 하지만 저는 두개의 값은 일치하기 때문에 같은 객체로 보고 싶습니다.  
이 경우 Age 클래스에서 equals 메서드를 Override 합니다.

  ```java
  public class Age {
    private int age;

    public Age(int age) {
      this.age = age;
    }

    public int getAge() {
      return this.age;
    }

    @Override
    public boolean equals(Object obj) {
      Age target = (Age) obj;

      if (this.age == target.age) {
        return true;
      }

      return false;
    }
  }
  ```

이제 case1과 case2는 같은 객체라고 나오게 됩니다.

  ```java
  case1.equals(case2); // true;
  ```

<br><br>

## equals와 hashCode는 함께 오버라이드 해야한다

하지만 equals()만 오버라이드 해서는 안되고 반드시 equals()와 hashCode()를 함께 오버라이드 해야합니다.  
왜냐하면, equals()를 오버라이드 해서 두 객체는 같다고 생각하고 코드를 작성하던 중 hash를 사용하는 경우를 맞딱트리게 되면 다른 결과가 나오기 때문입니다.  
  
예를 들면 다음과 같습니다. (위에서 정의한 Age 클래스를 그대로 이어갑니다)

  ```java
  Age case1 = new Age(10);
  Age case2 = new Age(10);
  
  case1.equals(case2); // true

  Map<Age, Integer> map = new HashMap<>();

  map.put(case1, 10);
  map.put(case2, 20);

  map.get(case1);
  /*
   * 20이 나올 것이라 기대합니다.
   * 하지만 case1과 case2는 다른 hashCode를 가지고 있기 때문에
   * Map Collection에서 다른 key로 인식하고 각각 다르게 넣어버립니다.
   */
  ```

우리는 값이 동일한 Age에 대해서 같은 객체로 판별하기로 약속하기 위해 equals를 오버라이드 했는데 hash를 사용하는 경우에 당면하니 우리가 원했던 결과를 얻을 수 없었습니다. 나중에 프로젝트의 규모가 커지게 되면 이는 엄청난 사이드이펙트를 가져올 수 있기 때문에 항상 equals와 hashCode는 같이 오버라이드 해주어야 합니다.

<br><br>

## hashCode

앞선 Age 클래스에 hashCode를 오버라이드 하도록 하겠습니다.

  ```java
  public class Age {
    private int age;

    public Age(int age) {
      this.age = age;
    }

    public int getAge() {
      return this.age;
    }

    @Override
    public boolean equals(Object obj) {
      Age target = (Age) obj;

      if (this.age == target.age) {
        return true;
      }

      return false;
    }

    @Override
    public int hashCode() {
      return Objects.hash(this.age);
    }
  }  
  ```

이제 case1과 case2의 hashCode는 똑같아졌을 것입니다.

  ```java
  Age case1 = new Age(10);
  Age case2 = new Age(10);
  
  case1.equals(case2); // true

  Map<Age, Integer> map = new HashMap<>();

  map.put(case1, 10);
  map.put(case2, 20);

  map.get(case1); // 20
  ```

<br><br>

## 정리

- equals()와 hashCode()의 Override를 통해서 객체를 조건에 동일한 것으로 취급되게 만들 수 있다.
- `반드시 equals()와 hashCode()는 함께 써야 한다`.
