---
title: "[React] 시간이 맞는 타이머 구현하기"
date: 2021-02-17
category: "All"
draft: true
---

<br><br>

개인적인 프로젝트로 뽀모도로 타이머를 구현해보고 있었는데, 시간이 지날수록 타이머가 느려지는 문제가 있어서 이를 해결한 과정을 소개합니다.

<br>

## setTimeout VS setInterval

누군가에게 JavaScript로 타이머를 구현해보라 한다면 `setTimeout`과 `setInterval`을 떠올릴 것입니다.  
하지만 setTimeout은 콜백함수가 실행된 이후부터 ms만큼 뒤에 실행하게 되므로 콜백함수의 실행시간만큼 타이머가 지연이 생기게 됩니다. [참고](https://ko.javascript.info/settimeout-setinterval)  
반면, setInterval은 콜백함수의 실행과 관계없이 항상 ms만큼 뒤에 콜백함수가 호출되기 때문에 타이머를 만들기에는 setInterval이 더 적합할 것이라 생각했습니다.  
  
그래서 저는 setInterval로 타이머를 만들기로 결정하였고, 만든 React 컴포넌트는 다음과 같습니다.

  ```js
  export default function IntervalTimer() {
    const [timer, setTimer] = useState(0);
    const timerId = useRef();

    useEffect(() => {
      timerId.current = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);

      return () => {
        clearInterval(timerId.current);
      };
    });

    return <div>{timer}</div>
  }
  ```

<br><br>

## 하지만 타이머가 느려지는 문제 발견

해당 방법으로 구현했을 때 제 노트북으로는 약 1시간당 5초 정도 시간이 느려지는 문제가 있었고, 성능이 떨어지는 컴퓨터에서는 분단위까지 느려지는 문제가 있었습니다. 찾아본 결과 JavaScript의 setInterval로는 완전한 시간을 보장할 수 없다는 것을 알게되었고, Date 객체를 활용하여 해결해보기로 하였습니다.

다음은 Date 객체를 활용한 타이머 컴포넌트입니다.

  ```js
  export default function CalibratedIntervalTimer() {
    const [timer, setTimer] = useState(0);
    const calibrationTime = useRef();
    const timerId = useRef();

    useEffect(() => {
      calibrationTime.current = Date.now(); // 기준이 될 시간을 잡아 놓습니다.
    }, []);

    useEffect(() => {
      timerId.current = setInterval(() => {
        if (calibrationTime.current + 1000 <= Date.now()) { // 기준에 맞는지 판별합니다.
          calibrationTime.current += 1000; // 1초 이후의 값이 기준이 되도록 변경합니다.
          setTimer((time) => time + 1);
        }
      }, 100); // 1000ms가 아닌 100ms를 줌으로써 오차 범위를 줄였습니다. (±100ms)

      return () => {
        clearInterval(timerId.current);
      };
    });

    return <div>{timer}</div>
  }
  ```

  이와 같은 방식으로 Date 객체를 활용함으로써 시간에 맞는 타이머를 구현할 수 있었습니다. 1시간이 지나도 오차는 ±100ms 이상 발생하지 않습니다.

  <br>

  하지만 이 방식은 100ms 마다 setInterval을 호출한다는 점에서 성능적으로 좋지 않을 수 있습니다. 이 경우에는 setTimeout과 Date 객체를 사용하면 더 적절히 해결할 수 있습니다.

  ```js
  export default function CalibratedTimeoutTimer() {
    const [timer, setTimer] = useState(0);
    const calibrationTime = useRef();

    const startTimer = () => {
      const difference = (Date.now() + 1000) - calibrationTime.current; // 발생한 오차를 계산합니다.
      
      calibrationTime.current += 1000; // 1초 이후의 값이 기준이 되도록 변경합니다.

      setTimer((time) => time + 1);
      
      setTimeout(startTimer, 1000 - difference); // 오차만큼 지연 시간을 보정해줍니다.
    };

    useEffect(() => {
      calibrationTime.current = Date.now(); // 기준이 되는 시간을 설정합니다.
      startTimer();
    }, []);

    return <div>{timer}</div>
  }
  ```

  이 방식은 약 1초에 한 번씩만 setTimeout을 호출하게 되며 이전에 setInterval을 1초에 10번씩 호출했던 것에 비해 효율적이고, 오차를 직접 계산해서 보정해준다는 점 때문에 직접 확인해본 결과 평균적으로 약 8ms 정도의 오차만큼이 났습니다.

<br><br>
