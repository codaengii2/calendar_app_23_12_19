var modalEl = document.querySelector(".back_modal");
let formEl = document.querySelector(".con");
const mySchStart = document.querySelector(".start p");
// const mySchEnd = document.querySelector(".end");
const mySchTitle = document.querySelector(".text");
const mySchAllday = document.querySelector(".allday");
const mySchBColor = document.querySelector(".bgcolor");
const plusEl = document.querySelector(".modal .con .plus");
const closeEl = document.querySelector(".modal .close");
const eventModal = document.getElementById("eventModal");
const eventClose = document.querySelector(".e_close");
const eventForm = document.getElementById("eventForm");
const eventTitleInput = document.getElementById("eventTitleInput");
const updateEventBtn = document.getElementById("updateEventBtn");
const deleteEventBtn = document.getElementById("deleteEventBtn");
let currentEvent = null;

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    // locale: "kr", //언어설정
    timeZone: "UTC",
    expandRows: true, //화면에 맞게 높이 설정
    initialView: "dayGridMonth", //달별로 보이게 설정
    headerToolbar: {
      center: "dayGridMonth,timeGridDay",
      // center: "addEventButton",
      right: "prev,next",
    }, //툴바 설정
    navLinks: true, //day 클릭 여부
    selectable: true, //영역 선택가능
    editable: true, //event 수정가능여부
    dayMaxEvents: true, //event 종료날짜 수정가능여부
    eventDrop: function (info) {
      if (confirm("'" + info.event.title + "' 일정을 수정하시겠습니까?")) {
      }
      // alert(
      //   info.event.title +
      //     " " +
      //     info.event.start.toISOString() +
      //     "으로 일정변경 "
      // );

      // if (!confirm("일정을 수정하시겠어요?")) {
      //   info.revert();
      // }
    }, //event 수정가능여부

    eventDurationEditable: true, //event 기간수정가능
    eventInteractive: true,
    timeZone: "UTC",
    // eventSources: [
    // {
    //   url: "../basic.php",
    //   method: "POST",
    //   extraParams: function () {
    //     return {
    //       dynamic_value: Math.random(),
    //     };
    //   },
    //   failure: function () {
    //     alert("데이터 불러오기 실패");
    //   },
    // },
    // {
    //   url: "http://localhost:3000/posts",
    //   method: "GET",
    //   extraParams: function () {
    //     return {
    //       dynamic_value: Math.random(),
    //     };
    //   },
    //   failure: function () {
    //     alert("데이터 불러오기 실패");
    //   },
    // },
    // {
    //   url: "http://localhost:3000/comments",
    //   method: "GET",
    //   extraParams: function () {
    //     return {
    //       dynamic_value: Math.random(),
    //     };
    //   },
    //   failure: function () {
    //     alert("데이터 불러오기 실패");
    //   },
    // },
    // {
    //   url: "http://localhost:3000/profile",
    //   method: "GET",
    //   extraParams: function () {
    //     return {
    //       dynamic_value: Math.random(),
    //     };
    //   },
    //   failure: function () {
    //     alert("데이터 불러오기 실패");
    //   },
    // },
    // {
    //   url: "http://localhost:3000/holiday",
    //   method: "GET",
    //   extraParams: function () {
    //     return {
    //       dynamic_value: Math.random(),
    //     };
    //   },
    //   failure: function () {
    //     alert("데이터 불러오기 실패");
    //   },
    // },
    // ],
    // eventDidMount: function (info) {
    //   // console.log(info.event.extendedProps);
    //   // {description: "Lecture", department: "BioChemistry"}
    // },
    eventColor: "#AAEEFF", // event 색상
    // eventDisplay: "list-item",/

    // eventContent: {
    //   html: `<div><i class="fa-solid fa-heart"></i></div>`,
    // }, //event 하트로 보이게
    events: [
      {
        id: "a",
        title: "my event",
        start: "2023-12-20",
      },
      {
        title: "산책",
        start: "2023-12-13T10:30:00",
        end: "2023-12-15T11:30:00",
        extendedProps: {
          department: "하루루틴",
        },
        description: "코코",
      },
      {
        title: "학원 휴무",
        start: "2023-12-22",
        color: "#F24E4E",
      },
      {
        title: "에약",
        start: "2023-12-23",
        color: "#FFCF33",
      },
      {
        title: "크리스마스",
        start: "2023-12-25",
        color: "#F24E4E",
      },
    ],

    dateClick: function (info) {
      // mySchStart.textContent = info.dateStr;

      const submitHandler = (event) => {
        event.preventDefault();
        var dateStart = new Date(info.dateStr + "T00:00:00");
        if (!isNaN(dateStart.valueOf())) {
          var event = {
            title: mySchTitle.value,
            start: info.dateStr,
            allDay: mySchAllday.checked,
            backgroundColor: mySchBColor.value || "#AAEEFF",
            color: "#AAEEFF",
          };
          calendar.addEvent(event);
          // alert("일정 업로드 성공");

          formEl.reset();
          formEl.removeEventListener("submit", submitHandler);
          modalEl.style.display = "none"; // 모달 닫기
        } else {
          console.log("유효하지 않은 날짜입니다.");
        }
      };

      // 모달 닫기
      const closeHandler = () => {
        formEl.reset();
        formEl.removeEventListener("submit", submitHandler);
        modalEl.style.display = "none";
      };
      formEl.addEventListener("submit", submitHandler);

      closeEl.addEventListener("click", closeHandler);

      modalEl.style.display = "block";
    }, //날짜 클릭옵션

    eventClick: function (info) {
      // 이번에 클릭한 이벤트 앞에 다른 이벤트클릭이 있으면 모두 제거
      if (currentEvent) {
        updateEventBtn.removeEventListener("click", currentEvent.editHandler);
        deleteEventBtn.removeEventListener("click", currentEvent.clickHandler);
        eventClose.removeEventListener("click", currentEvent.closeHandler);
      }
      eventModal.style.display = "block";
      const event = info.event;
      const eventTitle = event.title;
      eventTitleInput.value = eventTitle;
      // 수정 버튼 클릭 시
      const eventEditHandler = (e) => {
        e.preventDefault();
        const newTitle = eventTitleInput.value;
        if (newTitle !== eventTitle) {
          event.setProp("title", newTitle);
          alert("이벤트가 수정되었습니다.");
        } else {
          alert("수정된 내용이 없습니다.");
        }
        // 모달 닫기
        eventModal.style.display = "none";
      };
      updateEventBtn.addEventListener("click", eventEditHandler);

      // 삭제 버튼 클릭 시
      const eventClickHandler = () => {
        if (confirm("정말로 이벤트를 삭제하시겠습니까?")) {
          event.remove();
          alert("이벤트가 삭제되었습니다.");
        }
        // 모달 닫기
        eventModal.style.display = "none";
      };

      deleteEventBtn.addEventListener("click", eventClickHandler);

      // 모달 닫기 버튼 클릭 시
      const eventCloseHandler = () => {
        eventModal.style.display = "none";
      };
      eventClose.addEventListener("click", eventCloseHandler);

      // currentEvent에 이벤트 리스너들 저장
      currentEvent = {
        editHandler: eventEditHandler,
        clickHandler: eventClickHandler,
        closeHandler: eventCloseHandler,
      };
    },
  });

  calendar.render(); //캘린더 그리기

  calendar.on("select", (info) => {
    //달력에서 선택된 날짜
    // console.log("체크:", info);

    // mySchEnd.value = info.endStr; //종료일
    mySchAllday.value = info.allDay;

    // modalEl.style.display = "block";
  });

  // var event = calendar.getEventById("a"); // an event object!
  // var start = event.start; // a property (a Date object)
  // console.log(start.toISOString()); // "2018-09-01T00:00:00.000Z"
});
