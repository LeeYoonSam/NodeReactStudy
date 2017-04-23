# NodeReactStudy
Nodejs and React Study


## 20170423 - Add user info

GET /users 사용자 리스트 출력
GET /users/:id 각 사용자의 상세화면
————————————————————————
GET /profile 나의 정보를 볼수 있게 추가
GET /profile/edit 나의 정보 폼 화면이 나와여됨
POST /profile/edit 나의 정보 DB반영 (  req.user.id 저장 )
————————————————————————
models/ProfileModel.js

모델을 확장해서 쓴다 ( userd_id 필드 생성후 UserModel 연결 )
생일
전화번호
성별 기타 등등