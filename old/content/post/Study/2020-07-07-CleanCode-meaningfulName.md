---
title: Clean Code - 의미 있는 이름
date: 2020-07-07
tag: [Study]
---

## 의도를 분명히 밝혀라

좋은 이름을 지으려면 시간이 걸리지만 좋은 이름으로 절약하는 시간이 훨씬 더 많다.

## 그릇된 정보를 피하라

그릇된 단서는 코드의 의미를 흐린다. 여러 계정을 그룹으로 묶을 때, 실제 List가 아니라면 accountList라 명명하지 않는다(사실 실제 컨테이너가 List일지라도 List를 이름에 넣는 것은 좋지 않다). 그러므로 accountGroup, bunchOfAccounts, 아니면 단순히 Accounts라 명명한다.

## 의미 있게 구분하라

이름이 달라야 한다면 의미도 달라져야 한다. copy라는 메서드의 매개변수로 arr1, arr2를 넣지 말자. source와 destination처럼 의미 있는 이름이 적합하다.  변수에 variable이라는 단어도 금지다. NameString이라는 명명도 금지다. name은 당연히 String이다.  
info나 data도 변수 명에 포함시키는 걸 지양한다. getAccountInfo, getAccountData, getAccount는 무엇을 받아올지 구분되지 않는다.

## 검색하기 쉬운 이름을 사용하라

WORK_DAY_PER_WEEK = 5는 검색하기 쉽다. 하지만 5는 검색하려면 결과를 찾기가 너무 어렵다.  
간단한 메서드에서 로컬 변수만 e, v 같은 한 문자를 사용한다.  
**이름의 길이는 범위 크기에 비례해야 한다.**

## 한 개념에 한 단어를 사용하라

추상적인 개념 하나에 단어 하나를 선택해 이를 고수한다. 예를 들어, 똑같은 메서드를 클래스마다 fetch, retrieve, get으로 제각각 부르면 혼란스럽다.

## 한 단어를 두 가지 목적으로 사용하지 마라

예를 들어, 여러 클래스에 add라는 메서드가 생겼다. 이때 모든 add 메서드의 시그니처가 의미적으로 똑같다면 문제가 없다.  
하지만 때로는 프로그래머가 같은 맥락이 아닌데도 '일관성'을 고려해 add라는 단어를 선택한다. 예를 들어, 지금까지 구현한 add 메서드는 모두가 기존 값 두 개를 더하거나 이어서 새로운 값을 만든다고 가정하자. 새로 작성하는 클래스의 add 메서드는 집합에 값 하나를 추가한다. 이 메서드를 add라고 불러야 할까?  
이 메서드는 기존 add 메서드와 맥락이 다르므로, insert나 append라는 이름이 적당하다.

## 의미 있는 맥락을 추가하라

예를 들어, country, city, gu, dong, apartmentName, houseNumber 라는 변수가 있다. 변수를 훑어보면 대충 주소라는 사실을 알아챌 수 있다. 하지만 어느 메서드가 city라는 변수 하나만 사용한다면? 변수 city가 주소 일부라는 사실을 알아 챌 수 있을까?  
addr라는 접두어를 추가하면 맥락이 좀 더 분명해진다. addrCountry, addrCity, addrGu, addrDong, addrApartmentName, addrHouseNumber  
최고는 Address라는 클래스를 생성하는 것이다.
