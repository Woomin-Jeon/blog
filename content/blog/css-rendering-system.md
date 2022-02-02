---
title: "CSS Rendering"
date: 2021-05-01
category: "All"
draft: false
---

`참고` 맹기완 대표님의 [코드스피츠](https://www.youtube.com/playlist?list=PLBNdLLaRx_rKXwi7MulM6v1UG9JLKWIYS)를 들으면서 알게된 내용들을 정리한 포스팅입니다.

<br>

## Normal Flow

- Normal Flow는 `BFC`, `IFC`, `position: static | relative`로 그려지는 것을 말합니다.
- 여기서 `BFC`와 `IFC`란, Normal Flow를 계산하는 방식으로, Block Formatting Context와 Inline Formatting Context를 의미합니다.
  - BFC는 Block의 Geometry를 결정하는 계산 방식으로, Block은 부모의 width만큼 가로를 다 먹는 것, 그리고 다음 Block은 이전 블록의 height만큼 아래에 그려지는 것과 같은 계산 방식을 말합니다.
  - IFC는 Inline의 Geometry를 결정하는 계산 방식으로, Inline은 자신의 컨텐츠 크기만큼 가로를 먹는것, 그리고 부모의 width를 넘어가면 아래로 내려가서 그려지는 것과 같은 계산 방식을 말합니다.
- `position: relative`는 static을 기준으로 상대적으로 이동시키는 것을 말합니다.
- 아래 코드는 Normal Flow에 따라 다음과 같이 렌더링됩니다.

  ```html
  <div>
      <div>
        HELLO
        <span>
          WORLD
          <div style="background: blue">&nbsp;</div>
        </span>
        !!
      </div>
  </div>
  ```

  <div style="border: 1px solid black; border-radius: 4px; padding: 16px">
    <div>
      HELLO
      <span>
        WORLD
        <div style="background: blue">&nbsp;</div>
      </span>
      !!
    </div>
  </div>

## Float

- `Float`는 BFC나 IFC가 아니라 `Line Box`라는 모델로 그려지며, 기존의 BFC 영역을 파기하고 새로운 BFC 영역을 만들어 기존의 BFC 영역 위에 떠있는 것처럼 렌더링됩니다.
- 아울러 Float는 Inline 요소의 가드 역할도 해서 Float 영역 안에는 Inline 요소가 들어가지 못합니다.
- 아래 코드는 Normal Flow에 따라 렌더링되고, 앞서 말했듯 Inline요소는 Float의 영역에 들어가지 못합니다.

  ```html
  <div>
      <div style="height: 50px; background: blue;">
      <div style="width: 200px; height: 150px; background: rgba(0, 255, 0, 0.5); float: left"></div>
      HELLO
      <div style="height: 50px; background: skyblue">WORLD</div>
      !!
  </div>
  ```

  <div style="border: 1px solid black; border-radius: 4px; padding: 16px; height: 234px">
    <div>
      <div style="height: 50px; background: blue;"></div>
      <div style="width: 200px; height: 150px; background: rgba(0, 255, 0, 0.5); float: left"></div>
      HELLO
      <div style="height: 50px; background: skyblue">WORLD</div>
      !!
    </div>
  </div>
  
- `Line Box`    
  - Line Box는 처음에는 float에 의해 새롭게 생긴 BFC 영역 전체가 되지만, 이후 Float가 차지한 영역만큼씩은 줄어들게 됩니다. 그리고 Float 엘리먼트들은 이 Line Box 영역을 서로 가지며 배치되고, 들어갈 Line Box의 영역보다도 큰 Float 엘리먼트가 존재한다면 해당 Line Box의 하단을 기준으로 빈 공간에 그리게 됩니다.
  - Line Box에서는 left보다 더 왼쪽에 그릴 수 없고, right보다 더 오른쪽에 그릴 수 없습니다. 즉, left와 right 사이에만 그릴 수 있습니다.
  - 아래 코드는 Line Box에 따라 다음과 같이 렌더링 됩니다.

      ```html
      <div style="width: 500px;">
          <div class="left" style="width: 200px; height: 150px">1</div>
          <div class="right" style="width: 50px; height: 150px">2</div>
          <div class="right" style="width: 50px; height: 100px">3</div>
          <div class="left" style="width: 150px; height: 50px">4</div>
          <div class="right" style="width: 150px; height: 70px">5</div>
          <div class="left" style="width: 150px; height: 50px">6</div>
          <div class="left" style="width: 150px; height: 50px">7</div>
      </div>
      ```

      <div style="border: 1px solid black; border-radius: 4px; padding: 16px; height: 234px">
        <div style="width: 504px;">
          <div class="left" style="margin: 0.5px; color: white; text-align: center; background-color: green; float: left; width: 200px; height: 150px">1<br> (200 x 150)</div>
          <div class="right" style="margin: 0.5px; color: white; text-align: center; background-color: blue; float: right; width: 50px; height: 150px">2<br> (50 x 150)</div>
          <div class="right" style="margin: 0.5px; color: white; text-align: center; background-color: blue; float: right; width: 50px; height: 100px">3<br> (50 x 100)</div>
          <div class="left" style="margin: 0.5px; color: white; text-align: center; background-color: green; float: left; width: 150px; height: 50px">4<br> (150 x 50)</div>
          <div class="right" style="margin: 0.5px; color: white; text-align: center; background-color: blue; float: right; width: 150px; height: 70px">5<br> (150 x 70)</div>
          <div class="left" style="margin: 0.5px; color: white; text-align: center; background-color: green; float: left; width: 150px; height: 50px">6<br> (150 x 50)</div>
          <div class="left" style="margin: 0.5px; color: white; text-align: center; background-color: green; float: left; width: 150px; height: 50px">7<br> (150 x 50)</div>
        </div>
      </div>

- `Overflow`
  - `overflow: hidden | scroll`인 경우 새로운 BFC를 만듭니다.  
    그런데 이때 BFC는 Line Box를 경계로 합니다. 즉, 일반적인 BFC는 Line Box에 영향을 받지않고 BFC 영역 전체(부모의 width)의 가로길이를 먹었다면, `overflow: hidden | scroll`을 준 영역은 Line Box를 경계로 하기 때문에 Line Box의 width 만큼만 가로길이를 먹게됩니다.

## Position

- `Offset`
  - Geometry 계산이 끝나고 결과값이 fixed 넘버 숫자 체계로 바뀐 `읽기 전용 속성`입니다. 즉, 브라우저가 렌더링하고 나서 나온 결과값이기 때문에 이 offset을 읽기만 하는 건 상관 없지만, JavaScript에서 offset을 바탕으로 레이아웃을 계산하는 작업을 하게 되면 전체 레이아웃을 계속 다시 계산해야하기 때문에(offset은 Geometry 계산이 끝난 결과물이니까) 부하가 많이 생기게되므로 주의가 필요합니다.
  - 브라우저는 렌더링을 할 때, 각 엘리먼트의 레이아웃을 계산할 때마다 그리는 게 아니라 효율성을 위해 변경사항을 한번에 계산해주는데 이때 그리는 단위를 `프레임`이라 합니다.
  - 브라우저는 어떤 엘리먼트를 렌더링 할 때 DOM의 parent를 기준으로 렌더링 하는 게 아니라 `offset parent`를 기준으로 렌더링을 합니다. 예를 들어, `position: absolute`인 엘리먼트의 offset parent가 될 수 있는 것은 `position: absolute | relative`인 엘리먼트이므로, 해당 `position: relative | absolute`인 부모를 재귀적으로 찾아서 올라갈 뿐 DOM의 parent와는 관련이 없습니다.
  - 이러한 특성 때문에 `position: relative`는 static의 위치를 조정하는데 쓰이기 보다는 absolute를 감싸는 컨테이너로 주로 사용됩니다.
  - 요소
      - offsetLeft
      - offsetTop
      - offsetWidth
      - offsetHeight
      - offsetScrollTop
      - offsetScrollLeft
      - offsetScrollWidth
      - soffsetScrollHeight
- `position: absolute`의 기본값은 static과 동일합니다. 따라서 `left`와 `top`을 주지 않으면 static일 때와 동일한 위치에 렌더링되게 되며, left나 top을 주게 되면 `offset parent(position: relative | absolute)`을 찾아서 그걸 기준으로 잡고 렌더링하게 됩니다.
  - 즉 정리해보면, left와 top은 position static일 때, relative일때, absolute일때 각각 다른 계산 함수라고 볼 수 있습니다.
      - `position: static`의 경우: 무시된다.
      - `position: relative`의 경우: Normal Flow로 그린 이후에 거리를 계산한다.
      - `position: absolute`의 경우: offset parent로부터의 거리를 계산한다.

## Display Model - Layout

- **종류**
  - Outside - Normal Flow
      - Block, Inline, Run-In(경우에 맞게 block이 되거나 inline이 되거나)
      - 바깥쪽 부모에서 해당 레이아웃을 관리합니다.
  - Inside
      - Flow, Flow-Root, Table, Flex, Grid, SubGrid, Ruby
      - Flow-Root는 overflow: hidden과 같이 새로운 BFC 영역을 생성할 수 있습니다.
      - 내 안쪽에 있는 애들의 레이아웃을 관리합니다.
  - ListItem
      - List-Item
      - 과거에는 HTML 태그 안에 그림을 어떻게 그릴지에 대한 CSS 스타일이 내장되어 있었어서, 그냥 \<li\> 태그가 그리는 것처럼 그려달라는 것과 같습니다.
  - Box
      - Contents, None
  - Legacy
      - Inline-Block, Inline-Table, Inline-Flex, Inline-Grid
  - Internal

- `FlexBox`
  - FlexBox는 Post-Process(GPU에 올려서 그려주는 것)이기 때문에 빠릅니다.
  - FlexBox - Item의 order를 사용하면 순서를 마음대로 바꿀 수 있습니다. 이는 DOM의 구조를 바꾸지 않기 때문에 reflow가 발생하지 않고, 역시 repaint도 발생하지 않습니다.
    - 아래 코드는 FlexBox Item의 order에 따라 다음과 같이 렌더링 됩니다.
     
      ```html
      <div style="display: flex">
        <div style="order:3">1</div>
        <div style="order:2">2</div>
        <div style="order:1">3</div>
      </div>
      ```


      <div style="border: 1px solid black; border-radius: 4px; padding: 16px; height: 56px">
        <div style="display: flex">
          <div style="order:3; text-align: center; color: white; width: 100%; background: red;">1</div>
          <div style="order:2; text-align: center; color: white; width: 100%; background: green;">2</div>
          <div style="order:1; text-align: center; color: white; width: 100%; background: blue;">3</div>
        </div>
      </div>
