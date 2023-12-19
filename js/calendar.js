var modalEl = document.querySelector(".modal");
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
const deleteEventBtn = document.getElementById("deleteEventBtn");
const eventClose = document.querySelector(".e_close");

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "kr", //언어설정
    expandRows: true, //화면에 맞게 높이 설정
    initialView: "dayGridMonth", //달별로 보이게 설정
    headerToolbar: {
      locale: "kr",
      center: "dayGridMonth,timeGridDay",
      // center: "addEventButton",
      right: "prev,next",
    }, //툴바 설정
    navLinks: true, //day 클릭 여부
    selectable: true, //영역 선택가능
    editable: true, //event 수정가능여부
    eventDrop: function (info) {
      if (confirm("'" + info.event.title + "' 일정을 수정하시겠습니까?")) {
      }
      let events = new Array();
      let obj = new Object();

      obj.title = info.event._def.title;
      obj.start = info.event._instance.range.start;
      obj.end = info.event._instance.range.end;
      events.push(obj);

      $(function deleteData() {
        $.ajax({
          url: "",
          method: "PATCH",
          dataType: "json",
          data: JSON.stringify(events),
          contentType: "application/json",
        });
      });
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
    // resources: [],
    events: [
      {
        title: "산책",
        start: "2023-12-12",
        end: "2023-12-15",
        resourceEditable: true,
      },
    ],
    // eventColor: "red", // event 색상
    eventDisplay: "list-item",
    // eventContent: {
    //   html: `<div><i class="fa-solid fa-heart"></i></div>`,
    // }, //event 하트로 보이게

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
    eventClick: function openModal(info) {
      const eventId = info.event.id;
      const event = calendar.getEventById(eventId);

      eventModal.style.display = "block";

      // 수정 버튼 클릭 시
      eventForm.addEventListener("submit", function (e) {
        e.preventDefault();

        eventModal.style.display = "none";
      });

      // 삭제 버튼 클릭 시
      deleteEventBtn.addEventListener("click", function () {
        if (event) {
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
    console.log("체크:", info);

    // mySchEnd.value = info.endStr; //종료일
    mySchAllday.value = info.allDay;

    // modalEl.style.display = "block";
  });
  // FullCalendar에서 이벤트를 클릭할 때 모달창 열기
  calendar.on("eventClick", function (info) {
    openModal(info.event);
  });
});

/* function (info) {
      const eventId = info.event.id;
      let event = calendar.getEventById(eventId);

      if (event) {
        // 이벤트가 존재하는 경우 제거합니다.
        event.remove();
        console.log("이벤트가 성공적으로 삭제되었습니다.");
      } else {
        // 이벤트를 찾을 수 없는 경우 예외처리 또는 메시지 출력 등을 할 수 있습니다.
        console.log("해당 이벤트를 찾을 수 없습니다.");
      }
    }, */
