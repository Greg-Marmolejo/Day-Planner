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

// If a new date was selected from the Date Picker
function datePickerChange() {
    //Get the new date - If the date is not valid, default to today
    curDate = moment($("#datepicker").val(), "YYYY-MM-DD");
    if (!curDate.isValid()) {
        curDate = moment();
    }
    //Update the header, cancel existing timers, fade in the content 
    setCurrentDateLabel();
    loadDay(fadeNormal);
}

// Event Listener  (Save buttons).
function handleSave() {
    var $desc = $(this).siblings(".description");
    var hour = $desc.attr("data-hour");
    var text = $desc.val();
    localStorage.setItem(getStoreDatePrefix() + hour.trim(), text.trim());
    $("#save-toast").fadeIn(fadeToastIn).fadeOut(fadeToastOut);
}

// Sets the current day in the header
function setCurrentDateLabel () {
    $("#currentDay").text(curDate.format('dddd, MMMM, Do'));
}

// Load the current day onto the page
function loadDay(fadeTime=0) {
    clearInterval(updateinterval)

    $(".container").html(""); // Clear out data
    // Create and Load Time Blocks
    for(var index=0; index<times.length; index++) {
        $(".container").append(createTimeBlock(times[index]));
    }

/// Setup interval to update past, present, and future classes every 30s.
    updateinterval = setInterval(checkTimeBlocks, timeBlockDelayMS);

    /////////// Styling ////////////////

    // Change opacity of description in hover
    $('description').hover( function() {
        $(this).toggleClass("active");
    });
    
    //Hover over save button changes opacity and makes disk larger//
    $('.saveBtn').hover( function() {
        $(this).toggleClass("active");
    });

    $(".container").hide().fadeIn(fadeTime);
}

// Checks if the timeblocks' tense has changed
function checkTimeBlocks() {
    console.log("Check Time Block Active");
    var $descriptions = $('.description');
    $descriptions.each(function(index) {
        var hour12 = $(this).attr("data-hour"); // Get hour
        var t = getMoment12H(hour12);
        var tense = getTense(t)
        if ($(this).hasClass(tense)) {
            //console.log("/NO CHANGE");
        } else if (tense === "present") {
            $(this).removeClass("past future");
        } else if (tense === "past") {
            $(this).removeClass("present future");
        } else if (tense === "future") {
            $(this).removeClass("present past");
        } else {
            alert("Unknown Tense");
        }
        $(this).addClass(tense);
    });
}

/// Create a time block group
function createTimeBlock(hour24) {
    var row = createEl("div", "row");
    var timeBlock = createEl("div", "time-block");
    timeBlock.appendChild(row);
    var colHour = createEl("div", "col-sm-1 col-12 pt-3 hour", hour24);
    row.appendChild(colHour);
    var colText = createEl("textarea", "col-sm-10 col-12 description", hour24);
    row.appendChild(colText);
    var colSave = createEl("div", "col-sm-1 col-12 saveBtn");
    row.appendChild(colSave);
    var icon = createEl("i", "fas fa-save");
    colsave.appendChild(icon);

    return timeBlock;
}   
// Create a single page element
// tag = tag to create
// cls = classes to assign
// hour24 = the current hour (only used by hour and description classes)
function createEL(tag, cls, hour24) {
    var el= document.createElement(tag);
    // Special Handling for Hour and Description Columns which need the hour.
    if (hour24) {
        var t = getMoment24H(hour24);
        let displayHour = formatAmPm(t);
        if (cls.includes("description")) {
            // description class
            cls +=" " + getTense(t);
            el.textContent = localStorage.getItem(getStoreDatePrefix() + displayHour);
            el.setAttribute("data-hour", displayHour);
        } else {
            // hour class
            el.textContent = displayHour.padEnd(4, " ");
        }   
    }  
    // Set the class of the element
    el.setAttribute("class", cls);
    return el; 
}

// Check to see if the specified time is in the past, present, or future, compared to current time.
function getTense(t) {
    var cls;
    var n = moment();
    
    if (n.isSame(t, "hour") &&
        n.isSame(t, "day")  &&
        n.isSame(t, "month") &&
        n.isSame(t, "year")) {
            cls = "present";
        } else if (n.isAfter(t)) {
            cls = "past"
        } else {
            cls = "future";
        }
        return cls;
}

/// Get String

// Get string prefix for localStorage based off curDate
function getStoreDatePrefix() {
    return curDate.format("YYYYMMDD-");
}

// Return the moment formatted as a 12-hour AM/PM time string (Example: 10AM)
function formatAmPm(m) {
    return m.format("hA");
}

//////// Get Moment ///////////
// Create a new moment based off curDate and a 12hr AM/PM format time string
function getMoment24H(hour24) {
    return moment(curDate.format("YYYYMMDD ") + hour24, "YYYYMMDD H");
}

// Document Ready
$(function() {
    // Set the date in the header
    setCurrentDateLabel();

    // Load Multi-day setting from local storage and update the checked state.
    loadMultiDaySettings();

    // Watch for click of Enable Multi-day support
    $("enableDate").on("click", multiDayChecked);

    // Initialize the Date Picker and Setup a 'change' event handler
    $("#datepicker").val(moment().format('YYYY-MM-DD'));
    $("#datepicker").on("change", datePickerChange);

    // Setup Save Button events through the container element
    $(".container").on("click," ".saveBtn", handleSave);

    // Load the day into the view Once at the start with a fade-in
    loadDay(fadeStart);
});
