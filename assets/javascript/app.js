var options = [
	{
		question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
		choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
		answer: 1,
		photo: "assets/images/pupusas.jpg"
	 },
	 {
	 	question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
		choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
		photo: "assets/images/mtdew.gif"
	 }];


var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var question;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start-button").on("click", function () {
		$("#start-button").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
        }
        alert("clicked")();
    });
    
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    };

    //timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
};

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
};
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	
	question = Math.floor(Math.random()*options.length);
	pick = options[question];

		// answer array and display
	$("#question").html("<h2>" + pick.question + "</h2>");
	for(var i = 0; i < pick.choice.length; i++) {
		var userChoice = $("<div>");
		userChoice.addClass("answerchoice");
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
            correctCount++;
            userGuess="";
            $("#answer").html("<p>Correct!</p>");
            hidepicture();

        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
	        }
        })
};


function hidepicture () {
	$("#answer").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answer").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#question").empty();
		$("#question").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answer").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answer").empty();
	$("#question").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})
