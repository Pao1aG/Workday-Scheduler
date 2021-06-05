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
    and returns that element, and then finally turns that string into a number(+)*/
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

//Local Storage Functions----------------------------------------------

//Event Listener for buttons-------------------
var saveButton = $(".saveBtn");

var savedTasksArray= [];

saveButton.on("click", function(event){
    event.preventDefault();
    
    //Escaping white spaces found on t.ly/rMxx
    if($(this).prev("textarea").val().trim().length < 1){
        console.log("this is empty");
    } else {
        //this is the text written in textarea
        var savedTask = $(this).prev("textarea").val();
        console.log($(this).prev("textarea").attr("id"))
        console.log(savedTask);
        //New array that includes parent id
        var savedTaskId = $(this).parent().prop("id");
        console.log(savedTaskId);//success
        var taskIdArray = [savedTask, savedTaskId];
        savedTasksArray.push(taskIdArray)//push array into savedTasksArray array
        localStorage.setItem("savedTasksArray", JSON.stringify(savedTasksArray));//stringify array and save in local storage
        console.log(savedTasksArray);//success! got array/strings in array
    };
});

//Function for window load---------------------------

//Syntax for window load t.ly/Bc0w
$(window).on("load", function(event){
    event.preventDefault();

    /*Will run if there is something in the localstorage or if there is something
    already in the textarea */
    if(localStorage.savedTasksArray != null || $("textarea").val().trim().length > 1) {
        console.log($("textarea").val());
        var savedTasksArray = JSON.parse(localStorage.getItem("savedTasksArray"));//back into object
        
        /*Get the index name out of the arrays first 
        before placing tasks back into the corresponding textareas*/
        savedTasksArray.forEach(function(item, index) {
            savedTasksArray[index][1];
            // console.log(savedTasksArray[index][1] + " at index number " + index)//success
            /*Creating this variable by concatenating the # in front of "hour-n"
            and adding textarea at the end to compare the html element of textarea too*/
            var selector = "#"+savedTasksArray[index][1] + " textarea";
            // console.log(selector);
            //This writes the task saved at the array into the correct selector
            $(selector).text(savedTasksArray[index][0]);
        });
    } else {
        console.log("I had no text to save")
        return;
    };
});

//Event listener for input on textarea----------------

$("textarea").on("change", function(event) {
    event.preventDefault();

    console.log("value has been changed");//success
   
    var savedTasksArray = JSON.parse(localStorage.getItem("savedTasksArray"));
    
    var selectedArea = $(this).parent().attr("id"); //id
    console.log(selectedArea)//success
    var textArea = $(this).val(); //text inside 
    console.log(textArea);//success

    var buttonClicked = $(this).next();
    // console.log(buttonClicked);

});



