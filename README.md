## 설치 목록

- npm install --save @fullcalendar/react @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/list

- npm install style-loader css-loader sass-loader node-sass --save

- npm i styled-components

- npm install axios

- npm install mssql

- npm install @mui/material @emotion/react @emotion/styled

- npm install @mui/material @mui/styled-engine-sc styled-components

- npm install @fontsource/roboto
  ("import '@fontsource/roboto/700.css';" 이런식으로 사용)

- npm install @mui/icons-material

## 기획서

## 1. 제작의도

- 반려동물을 키우면서 기억해야할 병원 일정등이나 산책 기록등을 달력으로 관리할 수 있게 만들기

## 2. 기술 스택(stack)

- HTML, css, javascript, Node.js, React

## 3. 서비스 목표

- 달력에서 일정을 등록하고 삭제할 수 있음

- 일정별 중요도에 따라 색깔을 달리 선정하여 기록할 수 있음

- 일정이 달력에 표기되어 일정이 있는 날을 달력에서 한눈에 파악 가능

## 4. 사이트맵 구성 이미지

- https://www.figma.com/file/cVLWAvHRjcN8sQAj4r4RC7/link?type=design&node-id=0-1&mode=design&t=9O6dHRkqKXkyyvev-0

## 5. 클라이언트 요구사항 분석

### 달력 메인

- 메인에서 달력을 바로 볼 수 있게 설정
- 날짜를 클릭시 일정 추가 화면이 밑에서 올라옴
- 등록한 일정은 색깔과 함께 날짜 위에 표시됨

## [2차] 개발 기획서

## 12 / 08 (금)

### 할일

- 개발 기획서 완성

- 달력에 일정추가와 커스텀이 가능한지 미리 제작해본 후
  그것을 기반으로 일정관리 앱 만들기 시작

## 12 / 09 ~ 12 / 10 (토,일)

### 할일

- 피그마 파일 기반으로 전체적인 디자인 시안 완성

## 12 / 11 (월)

### 피드백

- 디자인 시안 컨펌

### 할일

- home ui 제작

## 12 / 12 (화)

### 할일

- home ui
- home 일정 추가 ui 제작

## 12 / 13 (수)

### 할일

- 일정 추가와 관련된 중요도별 색깔 설정

## 12 / 14 (목)

### 할일

- 반응형 설정

## 12 / 15 (금)

### 피드백

- 전반적인 진행과정 피드백

### 할일

- 이벤트 수정 및 삭제 구현
- 모달창 디자인

## 12 / 16 ~ 12 / 17 (토,일)

### 할일

- 이벤트 수정 및 삭제 구현

## 12 / 18 (월)

- 결석

## 12 / 19 (화)

### 할일

- 이벤트 수정 및 삭제 중복이벤트 수정
- 반응형 미리보기 만들기
- 모달창 배경 통일시키기

## 12 / 20 (수)

- 이벤트 중복 수정 후 배포
- 마무리 작업 및 완성

### 이후 추가해야할 일

- 일정 추가 모달창 취소와 추가 순서 바꾸기
- day 창에서 month 창으로 뒤돌아가는 버튼 만들기
- 일정 수정시 chakra - components - Promise-Based Toast 형식으로
  setTimeOut 넣어서 만들기
- eventDisplay: "list-item" 반응형으로 모바일에서 점형식 구현하기
- title 바꾸기 이왕이면 favicon도 추가, 강아지 copyright 추가
- 404 page 추가