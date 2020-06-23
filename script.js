var times = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];
// added current date to top of page
$("#currentDay").append(moment().format("dddd, MMMM Do"));

// loop for adding each row to the schedule
// note: /*html*/ is a funciton that allows a VSCode extension to color format the html in the loop as html instead of a string
for (let i = 0; i < times.length; i++) {
  $("#scheduleSpace").append(/*html*/ `<form>
  <div class="input-group">
    <p class="timeList">${times[i]}</p>
  
    <input
      id="schedualItem ${i}"
      type="text"
      class="form-control form-control-lg"
      name="schedualItem ${i}"
    />
  
    <div class="input-group-append">
      <button
        class="btn btn-outline-info bg-info"
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
}
