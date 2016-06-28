// When the page loads, creates new instances of the model, view, and controller, and initializes the first question
document.addEventListener('DOMContentLoaded', function() {
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);

    // Calls the MODEL's questionNumber function for the first question/answers
    model.questionNumber(0);
});

/*============ MODEL ============*/

// MODEL Constructor
var Model = function() {
    // Linked Variables with View
    this.questionText = "";
    this.answers = [];
    this.questionCurrent = 0;
    this.score = 0;

    // Callback functions 
    this.onChangeQuestionNumber = null;
    this.onAnswerSubmit = null;
};


// Prototype function that stores the current question object's values in the MODEL's variables
Model.prototype.questionNumber = function(questionIndex) {
    // Sets the questions number to the current question
    this.questionCurrent = questionIndex;
    // Storing actual question text 
    this.questionText = QUESTIONS[questionIndex].text;
    // Storing the answer values in the answer array
    this.answers = QUESTIONS[questionIndex].answers;

    // Links to setQuestion function in VIEW to update displayed questions/answers
    if (this.onChangeQuestionNumber) {
        this.onChangeQuestionNumber(this);
    }
}

// Prototype function that checks if submitted answer is correct and updates MODEL's score variable
Model.prototype.checkAnswer = function(choice) {
    // Sets current question object to variable question
    var question = QUESTIONS[this.questionCurrent];
    // Adds 1 to MODEL's score var if submitted answer is correct
    if (question.correct === choice) {
        this.score +=1; 
    }
    // Updates displayed score in the VIEW
    if (this.onScoreChange) {
        this.onScoreChange(score);
    }
    // Increments questionCurrent if it's not the last question 
    if (this.questionCurrent + 1 < QUESTIONS.length) {
        this.questionCurrent +=1;
    // Last question calls function to show results
    } else {
        showResults();
    }
}

// USED TO TEST MODEL IN CONSOLE
// var myModel = new Model();

// myModel.onChangeQuestionNumber = function(model) {
//     console.log("Question" + (myModel.questionCurrent + 1) + ": " + myModel.questionText);
//     console.log(myModel.answers);
// };

// MUST SWITCH question.correct to question.answers[question.correct] IN CHECK ANSWER FOR THIS TO WORK
// myModel.onAnswerSubmit = function(model) {
//     console.log("You've gotten" + myModel.score + "out of 4 correct");
// };

// Stored question/answers data
var QUESTIONS = [{
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0

    }, {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    }, {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    }, {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }];

/*============= VIEW =============*/

// VIEW Constructor
var View = function(model) {
    // Current instance of the MODEL passed from the MODEL
    this.model = model;

    // Linked variables
    this.questionElement = $('.question');
    this.answersElement = $('.answers');
    this.questionCurrentElement = $('.question-current');
    this.questionsTotalElement = $('.questions-total');
    this.scoreElement = $('.score');
    this.restartButtonElement = $('.restart-button');
    
    // Callback functions
    this.onChangeQuestionNumber = null;
    this.onAnswerSubmit = null;

    // Click event for submitting answers, calls onAnswerClick function
    console.log(this);
    this.answersElement.click(this.onAnswerClick.bind(this));

    // Click function that creates new game 
    this.restartButtonElement.click(function() {
        restartGame();
    });

    // Display only variables
    this.questionsPageElement = $('.questions-page');
    this.resultsPageElement = $('.results-page');
};

// Prototype function that displays stored values for current question 
View.prototype.setQuestion = function(model) {
    // Displays current question number
    this.questionCurrentElement.text(model.questionCurrent + 1);
    // Displays current question text
    this.questionElement.text(model.questionText);
    // Empties answersElement
    this.answersElement.empty();
    
    // Iterates through answers array for current question
    for (var i = 0; i < model.answers.length; i++) {
        // sets answers to variable
        var answer = model.answers[i];
        // prints to answers element
        this.answersElement.append('<li><button type="button">' + answer + '</button></li>');
    }
};

// Prototype function to store the submitted answer 
View.prototype.onAnswerClick = function() {
    console.log(this);
    // takes the index from the answer the user clicked and stores in the choice variable
    var choice = $(this).parent().index();

    // Passes the choice to the MODEL's checkAnswer function to determine if correct
    if (this.onAnswerSubmit) {
        this.onAnswerSubmit(choice);
    }
};
    
// Prototype function that updates score display element in the VIEW
View.prototype.updateScore = function(score) {
    // Displays current score from the MODEL's score variable
    this.scoreElement.text(score);

    // Callback function that initiates next question with MODEL's questionNumber function
    if (this.onChangeQuestionNumber) {
        this.onChangeQuestionNumber();
    }

};

// Function that creates a new game
function restartGame() {
    // Initializes a new instance of the model, view, and controller
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);

    // Calling the MODEL's questionNumber function and passing a questionIndex of 0
    model.questionNumber(0);
    // Displays the questions/answers section in the VIEW
    showQuestions();
};

// Display Only Functions
function showResults() {
    questionsPageElement.hide();
    resultsPageElement.show();
};

function showQuestions() {
    resultsPageElement.hide();
    questionsPageElement.show();
};

/*============ CONTROLLER ============*/

// Links the VIEW to the MODEL
var Controller = function(model, view) {
    // Upon storing values for current question in the MODEL, calls the setQuestion function in the VIEW to display values
    model.onChangeQuestionNumber = view.setQuestion.bind(view);
    // After user selects their answer, calls the MODEL's checkAnswer function to determine if it's correct and update the stored score variable
    view.onAnswerSubmit = model.checkAnswer.bind(model);
    // When the stored score variable is updated, calls the updateScore function in the VIEW to display the score change (if any)
    model.onScoreChange = view.updateScore.bind(view);
    // After the updated score is displayed, calls the MODEL's questionNumber function to store the values for the following question to start all over again
    view.onChangeQuestionNumber = model.questionNumber.bind(model);
};

