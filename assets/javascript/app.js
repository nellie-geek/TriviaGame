var options = [
    {
        question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?",
        choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
        answer: 1,
        
    },
    {
        question: "What popular soda beverage was originally developed as a mixer for whiskey?",
        choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
        answer: 0,

    }];


var correct = 0;
var wrong = 0;
var unanswer = 0;
var timer = 10;
var intervalId;
var userGuess = "";
var running = false;
var questionCount = options.length;
var pick;
var question;
// var newArray = [];
var holder = [];


$("#reset").hide();
//click start button to start game
$("#start-button").on("click", function () {
    $("#start-button").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }

});

//timer start
function runTimer() {
    clearInterval(intervalId); 
    if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
};

//timer stop
function stop() {
    running = false;
    clearInterval(intervalId);
};

//timer countdown
function decrement() {
    $("#timeLeft").text("Time remaining: " + timer);
    timer--;

    //stop timer if reach 0 //bandaid to display 0 whne timeout 
    if (timer === -1) {
        stop();
        unanswer++;
        $("#answer").html("<p>Time is up!<br> The answer is: " + pick.choice[pick.answer] + "</p>");
    
    }
};


//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {

    question = Math.floor(Math.random() * options.length);
    pick = options[question];

    // answer array and display
    $("#question").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerChoice");
        userChoice.html(pick.choice[i]);
        userChoice.attr("data-guess", i);
        $("#answer").append(userChoice);

    }

    $(".answerChoice").on("click", function () {
        // store user guess
        userGuess = parseInt($(this).attr("data-guess"));

        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correct++;
            userGuess = "";
            $("#answer").html("<p>Correct!</p>");
            hidepicture ();

        } else {
            stop();
            wrong++;
            userGuess = "";
            $("#answer").html("<p>Wrong!<br> The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture ();
        }
    })
};


function hidepicture() {
    // $("#answer").append("<img src=" + pick.photo + ">");
    holder.push(pick);
    options.splice(question, 1);

    var hidpic = setTimeout(function () {
        $("#answer").empty();
        timer = 20;

        //run the score screen if all questions answered
        if ((wrong + correct + unanswer) === questionCount) {
            $("#question").empty();
            $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answer").append("<h4> Correct: " + correct + "</h4>");
            $("#answer").append("<h4> Incorrect: " + wrong + "</h4>");
            $("#answer").append("<h4> Unanswered: " + unanswer + "</h4>");
            $("#reset").show();
            $("timer").hide();
            correct = 0;
            wrong = 0;
            unanswer = 0;

        } else {
            runTimer();
            displayQuestion();

        }
    }, 3000);


}

$("#reset").on("click", function () {
    $("#reset").hide();
    $("#answer").empty();
    $("#question").empty();
    for (var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    displayQuestion();

});
