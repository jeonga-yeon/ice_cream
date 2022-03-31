# Ice Cream

 >아이스크림은 사진과 영상으로 행복한 일상을 공유하며 하고 싶은 이야기들을 자유롭게 나눌 수 있는 웹 사이트이다. 관심 있는 사용자를 구독할 수 있고 좋아하는 게시글은 북마크 할 수 있다.

<br/>

## 주요 기능

- main 화면: 업로드한 게시글 목록을 볼 수 있다. 목록에서는 제목, 내용 미리 보기, 작성자, 해시태그를 볼 수 있다. 이미지와 동영상을 첨부한 포스트라면 내용 미리 보기에 이미지와 동영상이 보인다. 해시태그를 누르면 그 해시태그가 검색이 된다.

- 회원가입: 이름, 닉네임, 이메일, 비밀번호, 비밀번호 확인, 자기소개 칸을 모두 채우면 회원 가입이 가능하다. 닉네임과 이메일은 기존의 회원들과 중복되면 안 된다. 비밀번호 확인에서 틀리거나 중복되는 닉네임 혹은 이메일을 사용하면 그것을 알려주는 문구가 뜬다.

- 로그인: 이메일과 비밀번호를 입력하면 로그인 된다. 존재하지 않는 이메일이나 잘못된 비밀번호를 입력하면 에러 문구가 뜬다.

- 포스트 작성: 다양한 이야기들을 나눌 수 있고 여러 사진과 영상 또한 업로드할 수 있다.

- 포스트: 사진과 영상은 슬라이드로 볼 수 있고 새로고침하면 조회 수가 증가한다. 로그인을 하면 포스트를 북마크 할 수 있고 댓글도 작성할 수 있다. 댓글은 최신순으로 볼 수 있다. 그리고 자신의 포스트는 프로필 수정, 프로필 삭제 버튼이 있다.

- 포스트 수정: 작성했던 포스트를 수정할 수 있다.

- 검색: 제목과 해시태그를 검색할 수 있다.

- 프로필: 프로필 사진과 닉네임, 한 줄 메시지를 볼 수 있다. 그리고 
  ```
  로그인하지 않은 경우
  -> 해당 프로필의 작성 글과 댓글 목록을 볼 수 있다.

  로그인 후 본인의 프로필
  -> edit 버튼이 있고 설정 이모티콘을 누르면 본인의 세부 정보와 회원 탈퇴 버튼을 볼 수 있다. 
     그리고 작성 글, 댓글, 북마크 한 포스트, 구독한 사용자 목록을 볼 수 있다.

  로그인 후 다른 사용자의 프로필
  -> 구독하기 버튼이 있다. 구독 중이라면 '구독중'이라고 표시되어 있다. 
     그리고 작성 글, 댓글 목록을 볼 수 있다.
  ```
- 프로필 수정: 프로필 정보를 수정할 수 있다. 프로필 사진을 업로드, 수정, 삭제할 수 있으며 비밀번호 변경 또한 가능하다.

- 비밀번호 변경

- 삭제: 포스트, 댓글 모두 자유롭게 삭제할 수 있고 북마크와 구독도 취소할 수 있다. 포스트를 삭제하면 해당 포스트를 북마크 한 정보들과 댓글들이 사라지며 회원 탈퇴를 하면 회원의 모든 정보가 삭제된다.
  
<br />

## 기능 구현 영상

*영상은 로컬 환경에서 녹화  
*포스트 작성, 포스트 수정, 프로필 사진 변경 시 이미지와 영상을 업로드할 때 파일을 선택하는 화면은 녹화되지 않음  

https://drive.google.com/file/d/1kEp5psYaEbIxvedha1JxQkJrmJKkbGpk/view?usp=sharing

<br/>

## 개발 과정

node.js와 express로 서버를 생성  
데이터베이스는 MongoDB 사용  
ES6, Babel, Pug, Webpack, SCSS, Mongoose, Multer 사용  
Heroku에 서버를 배포하고 MongoDB Atlas로 MongoDB를 사용. 그리고 파일을 저장하기 위해 AWS S3 사용


<br />

- DB Schemas  
  <br />
  User Schema
  ```
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname: { type: String, required: true, unique: true },
    avatarUrl: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aboutuser: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookmark" }],
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    subscribers: { type: Number, default: 0, required: true },
    creationDate: { type: Date, default: Date.now, required: true },
  });
  ```
  Post Schema
  ```
  const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    videosUrl: [String],
    imagesUrl: [String],
    content: { type: String, required: true, trim: true },
    creationDate: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
     views: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
  });
  ```
  Comment Schema
  ```
  const commentSchema = new mongoose.Schema({
    creationDate: { type: Date, default: Date.now, required: true },
    text: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    post : { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  });

  ```
  Bookmark Schema
  ```
  const bookmarkSchema = new mongoose.Schema({
    bookmarkDate: { type: Date, default: Date.now, required: true },
    post : { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  });
  ```
  Subscription Schema
  ```
  const subscriptionSchema = new mongoose.Schema({
    subscriptionDate: { type: Date, default: Date.now, required: true },
    channel : { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  });
  ```
  <br />
- 문제 해결  
  <br />
  - 업로드한 동영상이 잘려서 보이는 문제 해결  
     페이지 로드 후 기능을 실행하는 window.onload를 사용해도 문제가 해결되지 않아 setTimeout()으로 시간을 지연시켰더니 문제가 해결되었다.
     <br />
  
  - 프로필 수정 시 닉네임을 바꾸지 않으면 이미 사용 중인 닉네임이어서 생기는 문제 해결  
      ```
      const nicknameExists = await User.exists({ nickname });
      if(nicknameExists) {
          return res.status(400).render("join", { 
              pageTitle, 
              errorMessage: "사용중인 닉네임입니다.", 
          });
      }
      -> 에러 발생

      const nicknameExists = await User.exists({ nickname });
      if(user.nickname === nickname) {

      } else if (nicknameExists) {
          return res.status(400).render("editprofile", { 
              pageTitle: "프로필 수정",
              errorMessage: "사용중인 닉네임입니다.", 
          });   
      }
      -> 다른 사용자가 아닌 본인의 닉네임과 일치하면 에러가 발생하지 않도록 함
      ```
    <br />

  - 포스트 삭제 시 댓글과 북마크 정보 모두 사라지도록 함
      ```
      const comments = await Comment.find({
        post: id,
      });
      await Comment.deleteMany({
        post: id,
      });
      for(let i = 0; i < comments.length; i++) {
        const commentOwner = await User.findById(comments[i].owner);
        commentOwner.comments.splice(commentOwner.comments.indexOf(comments[i]._id), 1);
        commentOwner.update();
      }

      const bookmarks = await Bookmark.find({
        post: id,
      });
      await Bookmark.deleteMany({
        post: id,
      });
      for(let i = 0; i < bookmarks.length; i++) {
        const bookmarkOwner = await User.findById(bookmarks[i].owner);
        bookmarkOwner.bookmarks.splice(bookmarkOwner.bookmarks.indexOf(bookmarks[i]._id), 1);
        bookmarkOwner.update();
      }
      ```
    <br />

  - 구독 취소 시 구독된 사용자의 아이디와 현재 로그인 되어있는 사용자의 아이디(구독한 사용자의 아이디)로 구독 정보를 찾아 삭제한다.
      ```
      await Subscription.findOneAndDelete({
        channel: id,
        owner: user._id,
      }); 
      ```
    <br />

  - 회원 탈퇴 시 경고 창이 뜨고 확인을 누르면 삭제 후 메인 화면으로 돌아가고 취소를 누르면 회원 탈퇴가 취소된다.
      ```
      const answer = confirm("정말 탈퇴하시겠습니까?\n회원님의 모든 정보가 삭제됩니다.");
      if(answer) {
          const userId = profileData.dataset.id;
          await fetch(`/api/users/${userId}/user-delete`, {
              method: "DELETE"
          });
          window.location.replace("/");
      } else {

      }
      ```
<br />

## 배포

Heroku에 서버를 배포  
MongoDB Atlas로 MongoDB 사용  
파일을 저장하기 위해 AWS S3 사용
