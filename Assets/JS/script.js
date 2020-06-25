var times = [
  { schedTime: "9 am", timeID: "9" },
  { schedTime: "10 am", timeID: "10" },
  { schedTime: "11 am", timeID: "11" },
  { schedTime: "12 pm", timeID: "12" },
  { schedTime: "1 pm", timeID: "13" },
  { schedTime: "2 pm", timeID: "14" },
  { schedTime: "3 pm", timeID: "15" },
  { schedTime: "4 pm", timeID: "16" },
  { schedTime: "5 pm", timeID: "17" },
];
var textField = "";

// added current date to top of page
$("#currentDay").append(moment().format("dddd, MMMM Do"));

// loop for adding each row to the schedule
// note: /*html*/ is a funciton that allows a VSCode extension to color format the html in the loop as html instead of a string
for (let i = 0; i < times.length; i++) {
  // if/else statement to either fill the value of the input field to the current locally stored value or leave the field blank
  if (localStorage.getItem(i, textField) === null) {
    textField = "";
  } else {
    textField = localStorage.getItem(i, textField);
  }
  //adding the html for each row of the schedule
  $("#scheduleSpace").append(/*html*/ `<form method="POST">
  <div class="input-group spacer">
    <p class="timeList noBtm">${times[i].schedTime}</p>
  
    <textarea
      id="schedualItem${i}"
      type="text"
      class="form-control form-control-md noBtm textForm"
      name="schedualItem${i}"
      rows=""
    >${textField}</textarea>
  
    <div class="input-group-append">
      <button
        class="btn noBtm bgButton"
        type="button"
        id="${i}"
        aria-label="Add to schedule"
      >
        <svg
          class="bi bi-calendar-check-fill text-light"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm10.854 3.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
          />
        </svg>
      </button>
    </div>
  </div>
  </form>`);

  //   adds row coloring based on time
  if (moment().format("H") === times[i].timeID) {
    $("#schedualItem" + i).removeClass("bgFuture");
    $("#schedualItem" + i).removeClass("bgDone");
    $("#schedualItem" + i).addClass("bgNow");
  } else if (parseInt(moment().format("H")) < parseInt(times[i].timeID)) {
    $("#schedualItem" + i).removeClass("bgDone");
    $("#schedualItem" + i).removeClass("bgNow");
    $("#schedualItem" + i).addClass("bgFuture");
  } else {
    $("#schedualItem" + i).removeClass("bgFuture");
    $("#schedualItem" + i).removeClass("bgNow");
    $("#schedualItem" + i).addClass("bgDone");
  }
}
// stores the input field value into local storage and then sets that as the current value of the input field
$("button").click(function () {
  var schedButton = this.id;
  console.log(schedButton);
  textField = $("#schedualItem" + schedButton).val();
  console.log(textField);
  localStorage.setItem(schedButton, textField);
});
$("#clear").click(function () {
  localStorage.clear();
  for (let i = 0; i < 9; i++) {
    $("#schedualItem" + i).val("");
  }
});
