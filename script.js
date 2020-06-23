var times = {
  0: { schedTime: "9 am", timeID: "9" },
  1: { schedTime: "10 am", timeID: "10" },
  2: { schedTime: "11 am", timeID: "11" },
  3: { schedTime: "12 am", timeID: "12" },
  4: { schedTime: "1 pm", timeID: "13" },
  5: { schedTime: "2 pm", timeID: "14" },
  6: { schedTime: "3 pm", timeID: "15" },
  7: { schedTime: "4 pm", timeID: "16" },
  8: { schedTime: "5 pm", timeID: "17" },
};
// added current date to top of page
$("#currentDay").append(moment().format("dddd, MMMM Do"));

// loop for adding each row to the schedule
// note: /*html*/ is a funciton that allows a VSCode extension to color format the html in the loop as html instead of a string
for (let i = 0; i < 9; i++) {
  $("#scheduleSpace").append(/*html*/ `<form>
  <div class="input-group">
    <p class="timeList noBtm">${times[i].schedTime}</p>
  
    <input
      id="schedualItem${i}"
      type="text"
      class="form-control form-control-lg noBtm border-light"
      name="schedualItem${i}"
    />
  
    <div class="input-group-append">
      <button
        class="btn btn-outline-light noBtm bg-info"
        type="button"
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

  if (moment().format("H") === times[i].timeID) {
    $("#schedualItem" + i).removeClass("bg-success");
    $("#schedualItem" + i).removeClass("bg-secondary");
    $("#schedualItem" + i).addClass("bg-danger");
  } else if (moment().format("H") < times[i].timeID) {
    $("#schedualItem" + i).removeClass("bg-secondary");
    $("#schedualItem" + i).removeClass("bg-danger");
    $("#schedualItem" + i).addClass("bg-success");
  } else {
    $("#schedualItem" + i).removeClass("bg-success");
    $("#schedualItem" + i).removeClass("bg-danger");
    $("#schedualItem" + i).addClass("bg-secondary");
  }
}
