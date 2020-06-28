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
	],
	storageArray = JSON.parse(localStorage.getItem("storeData")),
	textField,
	textData,
	startDate = moment().format("dddd, MMMM Do YYYY"),
	dispDate = startDate,
	idDate = moment().format("DDDYYYY");

// added current date to top of page
$("#currentDay").append(dispDate);

// changes the day to the next day
$("#nextDay").on("click", function () {
	dispDate = moment(dispDate, "dddd MMMM Do YYYY").add(1, "days");
	var day = dispDate.format("dddd"),
		month = dispDate.format("MMMM"),
		dayNum = dispDate.format("Do"),
		year = dispDate.format("YYYY");

	idDate = dispDate.format("DDDYYYY");
	$("#scheduleSpace").empty();
	$(document).ready(addRows());
	$("#currentDay").empty();
	$("#currentDay").append(day + ", " + month + " " + dayNum + " " + year);
});

// changes the day to the previous day
$("#previousDay").on("click", function () {
	dispDate = moment(dispDate, "dddd MMMM Do YYYY").subtract(1, "days");
	var day = dispDate.format("dddd"),
		month = dispDate.format("MMMM"),
		dayNum = dispDate.format("Do"),
		year = dispDate.format("YYYY");

	idDate = dispDate.format("DDDYYYY");
	$("#scheduleSpace").empty();
	$(document).ready(addRows());
	$("#currentDay").empty();
	$("#currentDay").append(day + ", " + month + " " + dayNum + " " + year);
});

// changes the day to the current day
$("#today").on("click", function () {
	dispDate = moment().format("dddd, MMMM Do YYYY");

	idDate = moment().format("DDDYYYY");
	$("#scheduleSpace").empty();
	$(document).ready(addRows());
	$("#currentDay").empty();
	$("#currentDay").append(dispDate);
});

// loop for adding each row to the schedule
// note: /*html*/ is a funciton that allows a VSCode extension to color format the html in the loop as html instead of a string
function addRows() {
	for (let i = 0; i < times.length; i++) {
		// loop to either fill the value of the input field to the current locally stored value or leave the field blank
		if (storageArray != null) {
			var j = 0;
			do {
				if (
					idDate == storageArray[j].timestamp &&
					storageArray[j].position == i
				) {
					textData = storageArray[j].log;
				} else {
					textData = "";
				}
				j++;
			} while (textData == "" && j < storageArray.length);
		} else {
			textData = "";
		}

		//adding the html for each row of the schedule
		$("#scheduleSpace").append(/*html*/ `<form method="POST">
    <div class="input-group">
      <p class="timeList noBtm">${times[i].schedTime}</p>
  
      <textarea
        id="schedualItem${i}"
       type="text"
       class="form-control form-control-md noBtm textForm"
       name="schedualItem${i}"
       rows="2"
      >${textData}</textarea>
  
      <div class="input-group-append">
        <button
          class="btn noBtm bgButton saveBtn"
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
}
$(document).ready(addRows());

// stores the input field value into local storage and then sets that as the current value of the input field
$("#scheduleSpace").on("click", ".saveBtn", function () {
	var schedButton = this.id,
		storageArray = JSON.parse(localStorage.getItem("storeData"));
	if (storageArray === null) {
		storageArray = [];
	}
	textField = $("#schedualItem" + schedButton).val();
	if (storageArray.length > 0) {
		for (let i = 0; i < storageArray.length; i++) {
			if (
				storageArray[i].timestamp == idDate &&
				storageArray[i].position == schedButton &&
				storageArray[i].log != textField
			) {
				storageArray.splice(i, 1);
				break;
			}
		}
	}
	storageArray.push({
		timestamp: idDate,
		position: schedButton,
		log: textField,
	});

	// removes duplicates
	// code segment from https://www.wikimass.com/json/remove-duplicates
	var data1 = storageArray.filter((thing, index) => {
		return (
			index ===
			storageArray.findIndex((obj) => {
				return JSON.stringify(obj) === JSON.stringify(thing);
			})
		);
	});
	storageArray = data1;

	var storeToLocal = JSON.stringify(storageArray);
	localStorage.setItem("storeData", storeToLocal);
});

// clears all entries
$("#clear").click(function () {
	localStorage.clear();
	storageArray = JSON.parse(localStorage.getItem("storeData"));
	for (let i = 0; i < 9; i++) {
		$("#schedualItem" + i).val("");
	}
});
