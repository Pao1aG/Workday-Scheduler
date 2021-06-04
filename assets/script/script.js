//Variables for timeblock elements
var hour9 = $("#hour-9");
var hour10 = $("#hour-10");
var hour11 = $("#hour-11");
var hour12 = $("#hour-12");
var hour13 = $("#hour-13");
var hour14 = $("#hour-14");
var hour15 = $("#hour-15");


//Moment clock (test), dcode on youtube-------------
var clock = $("#clock");
setInterval(() => {
    //get current date and time
    var now = moment();
    //this formats the time into two digits for hour and two digits for minutes
    var humanRead = now.format("hh:mm:a"); 
    // this updated the text in this div to show current time
    clock.text("Current time: "+ humanRead);
},1000);

//Display Date------------------
var date = $("#currentDay");
var TodayIs = moment().format("[Today is:] dddd[,] MMMM Do[,] YYYY");
date.text(TodayIs);

//Clock for functions-----------------------
var hour = +moment().format("H");
console.log("The schedule hour is now ", hour);

//Function to change CSS styles-past, present, and future-------------------
//this applies this function to all with class time-block
$(".time-block").each(function () { 
    /*targets this class, splits it's id (by its dash), 'pops' the last bit 
    and returns that element, and then finally turns string into a number(+)*/
    var scheduleHour = +$(this).attr("id").split("-").pop();
    // console.log(this);//list of all time-blocks
    // console.log("Time Block ", scheduleHour);

    if (hour === scheduleHour) {
        $(this).addClass("present");
    } else if (hour < scheduleHour) {
        $(this).addClass("future");
    } else {
        $(this).addClass("past");
    };
});

//Local Storage Functions-----------------------

//Event Listener for buttons
var saveButton = $(".saveBtn");
// console.log(saveButton);

var savedTasksArray= [];

saveButton.on("click", function(){
    //Escaping white spaces found on t.ly/rMxx
    if($(this).prev("textarea").val().trim().length < 1){
        console.log("this is empty");
    } else {
        var savedTask = $(this).prev("textarea").val();
        console.log(savedTask);
        //need to create an array that includes parent id
        var savedTaskId = $(this).parent().attr("id");
        console.log(savedTaskId);//success
        var taskIdArray = [savedTask, savedTaskId];
        savedTasksArray.push(taskIdArray)//push array into array
        // savedTasksArray.push(savedTask)//push text into array
        localStorage.setItem("savedTasksArray", JSON.stringify(savedTasksArray));//stringify array and save in local storage
        console.log(savedTasksArray);//success! got strings in array
    };
});

//Function for window load----------------------

//Syntax for window load t.ly/Bc0w
$(window).on("load", function(event){
    // var textareaLocation = $(this).parent().attr("id");
    event.preventDefault();

    //trying to get the index name out of the arrays first before we place the tasks into the
    //corresponding textareas

    var savedTasksArray = JSON.parse(localStorage.getItem("savedTasksArray"));//back into object
    var taskId= $(savedTasksArray).each(function(index) {
        savedTasksArray[index][1];
        console.log(savedTasksArray[index][1] + " at index number " + index)//success
    });
    
    // var tempArray = [];
    // tempArray.push(taskId)
    // console.log(tempArray);


    // if (taskId === textareaLocation) {
    //     console.log("I am in the right place");
    // }

    
   

    

});

   


