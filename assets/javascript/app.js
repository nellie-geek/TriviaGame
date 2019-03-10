    // track question
var questionCounter = 0;
    // time for each questions
var time = 15;
    // track correct answers
var correctGuess = 0;
    // rack incorrect answers
var incorrectGuess = 0;
    
    //question & answer array
var questions = [
    {   question: "In Greek mythology Medusa's hair was what?",
        answers: ["Stuff", "Hay", "Snakes", "Worms"],
        correctAnswer: 2, 
    },

    {

    }
]

function gameRun() {
    $("mainGame").append("<p>" + questions[questionCounter].question + "</p><p class='answers'>"
    + questions[questionCounter].answers[0] + "</p><p class='answers'>" + 
    questions[questionCounter].answers[1] + "</p><p class='answers'>" + 
    questions[questionCounter].answers[2] + "</p>< class='answers' " + 
    questions[questionCounter].answers[3] + "</p>");
}
console.log(mainGame);