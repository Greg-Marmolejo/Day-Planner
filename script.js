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


// functions - helper functions

// event listeners  (Save buttons)
