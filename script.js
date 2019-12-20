// Global element variables

// State variables
var times = [9,10,11,12,13,14,15,16,17,];  //hour-timeslot
var fadeStart = 3000;
var fadeNormal = 1500;

//Save Toast Fade Times
var firstNumber = "";
var operatorClicked = false;

// Time Block Updates
var timeBlockDelayMS = 30000;

var updateinterval; // Periodic Update of past, present, future class
var curDate = moment().clone(); //Current Day is initially Today


// Functions

function loadMultiDaySettings () {
    // Sets clock from local storage.
    var enableMultiDay = (localStorage.getItem("enableMultiDay") === "true") ? true : false;
    if (enableMultiDay) {
        //Set the check, show the DateGroup, and trigger the DateChange.
        $("#enableDate").prop("checked", true);
        $("#dateGroup").show();
        datePickerChange();
    }
}

// When Multi-Day checkbox changes state
function multiDayChecked () {
// Update Local Storage with new Multi-day setting
    var $ed = $("#enableDate");
    localStorage.setItem("enableMultiDay", $ed.prop("checked"));
    // Show or hide the date selector and reset the date as needed.
    if ($ed.is(":checked")){
        $("#dateGroup").show();
    } else {
        $("dateGroup").hide();
        // Reset current date to today
        curDate = moment();
        $("datepicker").val(moment().format('YYYY-MM-DD'));
        loadDay(0);
        setCurrentDateLabel();
    }
}

// Event Listeners  (Save buttons) - all of these are defined in functions.
