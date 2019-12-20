// We have our global element variables
var buttonEl = $("#button");

// state variables
var firstNumber = "";
var operatorClicked = false;

// functions - helper functions
function calculateResult(number1, number2, operator) {

// event listeners

Other things to keep in mind.  Text areas and how they work on updating and saving their text.  Set and get local storage.  Use moment for date and time.  When they click on the save button and enter stuff into a text area.  Click and save sets to local storage.
 
# Unit 05: Third-Party APIs

## Overview
When developers find themselves repeating a task, they tend to look for a way to simplify their workflow. We saw earlier how CSS frameworks were developed to ensure consistency across applications and to expedite developer workflows. Tools with similar goals have emerged in the JavaScript ecosystem. 

jQuery is a JavaScript library that simplifies DOM manipulation and event handling. It allows us to write fewer lines of code than we'd need to if we were using plain ol' JavaScript to accomplish the same end. jQuery also provides a number of methods for animations and working with APIs.

Some argue that jQuery is slowly being phased out and replaced with front-end frameworks such as React. You might not see as many job listings for jQuery developers, but it’s an important skill to master as the library is still widely used in both new and legacy code. 

## Key Topics
The following topics will be covered in this unit:
* jQuery
* DOM traversal and manipulation
* Event handling
* this
* data-* attributes

## Comprehension Check
You will be employer-ready if you can answer the following questions: 
1. What is jQuery? jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax. 

2. What is the difference between a library and a framework? A library is usually a piece of reusable code, you use for specific functionality. You access the library through an API for executing a specific function. For eg You use JDBC as the API to look up the library that deals with database connection, retrieval of data.


When you are speaking of Frameworks, it is more of a collection of libraries that can be accessed through an API.  It also dictates the architecture your application works with,where you have to factor the code as per the framework and design.

My answer:
A library is for a specific function through an API, a piece of resuable code.  A framework is a collection of librairies.

3. Why is dynamically generated HTML an issue for developers working with jQuery?  Sometimes the jQuery click not working for dynamically created items.

## Learning Objectives
You will be employer-competitive if you are able to: 
* Explain the difference between a JavaScript library and a framework
* Incorporate jQuery into HTML documents via CDN and using its associated selector
* Perform DOM traversals to get and select elements by tag, class, and id as well as node relationship
* Perform DOM manipulations to add, remove, and modify elements and attributes
* Implement interactivity using event handlers
* Explain the importance of `document.ready()` and how to resolve issues related to dynamically generated HTML

## Homework: Day Planner
Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

## Helpful Links
* [MDN: jQuery](https://developer.mozilla.org/en-US/docs/Glossary/jQuery)
* [Wikipedia: jQuery](https://en.wikipedia.org/wiki/JQuery)
* [jQuery Official Website](https://jquery.com/)


- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
