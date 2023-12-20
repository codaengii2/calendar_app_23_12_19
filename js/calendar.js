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
const eventForm = document.getElementById("eventForm");
const eventTitle = document.querySelector(".event_title");
const deleteEventBtn = document.getElementById("deleteEventBtn");
const eventClose = document.querySelector(".e_close");

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
    events: [
      {
        title: "산책",
        start: "2023-12-13T10:30:00",
        end: "2023-12-15T11:30:00",
        extendedProps: {
          department: "하루루틴",
        },
        description: "코코",
      },
    ],
    // events: "../json/basic.json",
    // eventDidMount: function (info) {
    //   // console.log(info.event.extendedProps);
    //   // {description: "Lecture", department: "BioChemistry"}
    // },
    // eventColor: "red", // event 색상
    // eventDisplay: "list-item",
    eventBorderColor: "transperant",

    // eventContent: {
    //   html: `<div><i class="fa-solid fa-heart"></i></div>`,
    // }, //event 하트로 보이게
    events: [
      {
        id: "a",
        title: "my event",
        start: "2023-12-20",
      },
    ],

    dateClick: function (info) {
      // mySchStart.textContent = info.dateStr;
      modalEl.style.display = "block";
      const submitHandler = (event) => {
        event.preventDefault();
        // var dateStrEnd = mySchEnd.value;
        var dateStart = new Date(info.dateStr + "T00:00:00");
        // var dateEnd = new Date(dateStrEnd + "T00:00:00");
        if (!isNaN(dateStart.valueOf())) {
          var event = {
            title: mySchTitle.value,
            start: info.dateStr,
            // end: mySchEnd.value || mySchStart.value,
            allDay: mySchAllday.checked,
            backgroundColor: mySchBColor.value,
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
      formEl.addEventListener("submit", submitHandler);
      // 모달 닫기
      closeEl.addEventListener("click", () => {
        formEl.reset();
        formEl.removeEventListener("submit", submitHandler);
        modalEl.style.display = "none";
      });
    }, //날짜 클릭옵션
    eventClick: function (info) {
      const eventId = info.event.id;
      const event = document.getElementById(eventId);
      eventModal.style.display = "block";

      // 수정 버튼
      eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // event.setProp(name, value);

        eventModal.style.display = "none";
      });

      // 삭제 버튼
      deleteEventBtn.addEventListener("click", function () {
        if (event) {
          console.log(moment);
          event.remove();
          alert("이벤트 삭제 완료");
        } else {
          alert("이벤트를 찾을 수 없음");
        }
        eventModal.style.display = "none";
      });

      // 모달창 닫기
      eventClose.addEventListener("click", function () {
        eventModal.style.display = "none";
      });
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

  var event = calendar.getEventById("a"); // an event object!
  var start = event.start; // a property (a Date object)
  console.log(start.toISOString()); // "2018-09-01T00:00:00.000Z"
});
