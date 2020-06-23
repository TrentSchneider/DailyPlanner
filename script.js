// added current date to top of page
$("#currentDay").append(moment().format("dddd, MMMM Do"));

function addSlots() {
  $("#scheduleSpace").append("<form>");
}
