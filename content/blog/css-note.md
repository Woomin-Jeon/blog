---
title: "CSS Note"
date: 2021-09-11
category: "All"
draft: false
---

## Safari issue

- **"overflow: hidden"과 "border-radius" 문제**
  - Safari에서 `overflow: hidden`과 함께 `border-radius`를 먹은 엘리먼트의 모서리가 둥글게 표시되지 않는 이슈가 있는데, 이는 웹킷 버그로 `isolation` 속성을 이용해서 새로운 레이어를 생성해줌으로써 해결할 수 있습니다
- **disabled input**
  - Safari에서는 `input` 같은 엘리먼트에 `disabled`를 주게되면 자동으로 `opacity`가 들어가게되어 의도하지 않은 스타일이 나올 수 있습니다. 이런 경우를 대비해 `opacity: 1`을 주어야 의도한 스타일을 적용할 수 있습니다.

## 글자를 투명하게 만들기

- mix-blend-mode

## \<textarea\>의 기본 여백

- textarea는 inline 속성이기 때문에 아래에 기본 여백이 존재합니다. display: block을 줌으로써 없앨 수 있습니다.

## Selectors

- `& + &` → 형제 옆에 나
- `A B` → A 하위에 있는 모든 B를 선택. 직계자식 아니라 손자여도 가능
- `A > B` → A의 직계 자식만 가능 손자는 불가능
- `:only-child` → 형제가 없다면
- `:only-of-type` → 타입들 중 오직 하나라면
- `:not(:first-of-type)` → 타입이 같은 엘리먼트 중 첫번째가 아니라면
