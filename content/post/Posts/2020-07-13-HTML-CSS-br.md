---
title: "[HTML/CSS] <textarea>에서 개행 적용하기"
date: 2020-07-13
tag: ["Posts"]
---

<br><br>

textarea에서 개행을 적용하기 위해서는 작성한 글을 서버로 올려서 데이터를 저장할 때, 개행 문자를 \<br\>태그로 치환해주면 됩니다.  

<br>

아래 코드는 Express 상에서 \<textarea\>로부터 받아온 내용을 정규식을 이용하여 개행 적용한 뒤 DB에 저장하는 간단한 코드입니다.

```javascript
app.post("/post", (req, res) => {
  const { title, contents } = req.body;

  const brAppliedContents = contents.replace(/[\\r\\n]|[\\r]|[\\n]/g, "<br>");

  DB.push({ key, title, contents: brAppliedContents });

  res.status(200).send();
});
```

<br>

이제 클라이언트에서 서버로부터 \<br\>태그가 적용된 데이터를 받아온 뒤 출력합니다.  
이때, 해당 출력물을 감싸는 \<div\>태그에 `white-space:pre;`라는 CSS 속성을 추가합니다.  

```jsx
<div style="white-space:pre;">
  {data.contents}
</div>
```

<br>

참고로 이와 같은 방식에서 수정기능을 추가하게 된다면, 수정 버튼을 눌렀을 때, \<br\>태그가 그냥 텍스트 자체로 출력되게 됩니다. 그렇기 때문에 다시 정규식으로 \<br\>태그를 개행 문자("\r\n")으로 바꿔주는 것이 필요합니다.  
  
아래 코드는 React 상에서 적용하는 방법입니다.

```javascript
const regex = new RegExp("[<br>]", "g");
const brUnappliedContents = data.contents.replace(regex, "\r\n");
const [contents, setContents] = useState(brUnappliedContents);

<textarea
  type="text"
  value={contents}
/>
```

<br><br>
