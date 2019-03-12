var options = [
    {
        question: "Colorado ranked _ nationally in craft breweries per capita?",
        choice: ["13", "3", "11", "5"],
		answer: 1,
		image: "assets/images/3rd.jpg",
        
    },
    {
        question: "What popular soda beverage was originally developed as a mixer for whiskey?",
        choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
		image: "assets/images/Dew_images.jpg",
	},
	{
		question: "Dry Dock Brewing Co. is located in what city?",
		choice: ["Longmont", "Arvada", "Golden", "Aurora"],
		answer: 3,
		image: "assets/images/DryDock.jpg",
	},
	{
		question: "In what state is it illegal to take more than 3 sips of beer while standing?",
		choice: ["California", "Arizona", "Iowa", "Texas"],
		answer: 3,
		image: "assets/images/Texas.jpg",
	},
	{
		question: "It's against the law to sit on the curb in St. Louis while drinking beer from a ______?",
		choice: ["bucket", "paper bag", "can", "bottle"],
		answer: 0,
		image: "assets/images/bucket.jpg",
	}, 
	{
		question: "In the 1830's the average American age 15 or older drank about __ gallons of beer every year?",
		choice:	["17", "27", "7", "21"],
		answer: 1,
		image: "assets/images/gallons.png",
	},
	{
		question: "A barrel of beer in the U.S. holds __ gallons?",
		choice: ["31", "28", "25", "21"],
		answer: 0,
		image: "assets/images/barrel.jpg",
	}, 
	{
		question: "What year was beer by the bottle available?",
		choice: ["1932", "1950", "1895", "1850"],
		answer: 3,
		image: "assets/images/1850.jpg",
	},
	{
		question: "What year was beer first available in a can?",
		choice: ["1935", "1923", "1925", "1915"],
		answer: 0,
		image: "assets/images/1935.jpg",
	}];



	var correct = 0;
	var wrong = 0;
	var unanswer = 0;
	var timer = 20;
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
	
		//stop timer if reach 0 //bandaid to display 0 when timeout 
		if (timer === -1) {
			stop();
			unanswer++;
			$("#answer").html("<p>Time is up!<br> The answer is: " + pick.choice[pick.answer] + "</p>");
			hidepicture();
		}
	};
	
	
	//display question and display possible answers
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
	
			} else if (userGuess !== pick.answer) {
				stop();
				wrong++;
				userGuess = "";
				$("#answer").html("<p>Wrong!<br> The correct answer is: " + pick.choice[pick.answer] + "</p>");
				hidepicture ();
			} else {
				// (timer === -1) {
					stop();
					unanswer++;
					$("#answer").html("<p>Time is up!<br> The answer is: " + pick.choice[pick.answer] + "</p>");
					hidepicture ();
			}
		})
	};
	
	
	function hidepicture() {
		$("#answer").append("<img src=" + pick.image + ">");
		holder.push(pick);
		options.splice(question, 1);
	
		setTimeout(function () {
			$("#answer").empty();
			timer = 20;
	
			//run the score screen if all questions answered
			if ((wrong + correct + unanswer) === questionCount) {
				$("#timeLeft").hide();
				$("#question").empty();
				$("#question").html("<h3>Game Over!  Here's your stats: </h3>");
				$("#answer").append("<h4> Correct: " + correct + "</h4>");
				$("#answer").append("<h4> Incorrect: " + wrong + "</h4>");
				$("#answer").append("<h4> Unanswered: " + unanswer + "</h4>");
				$("#reset").show();
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
	