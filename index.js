    /*============ MODEL ============*/

    var Model = function() {
        this.questionText = "";
        this.answers = [];
        this.questionCurrent = 0;
        this.score = 0;

        this.onChangeQuestionNumber = null;
        this.onAnswerSubmit = null;

    };

    var model = new Model();

    Model.prototype.questionNumber = function(questionIndex) {
        this.questionCurrent = questionIndex;
        this.questionText = QUESTIONS[questionIndex].text;
        this.answers = QUESTIONS[questionIndex].answers;

        if (this.onChangeQuestionNumber) {
            this.onChangeQuestionNumber(this);
        }

    };

    // change myModel to model instance
    myModel.onChangeQuestionNumber = (function(myModel.questionCurrent) {
        console.log("Question" + (myModel.questionCurrent + 1) + ": " + myModel.questionText);
        console.log(myModel.answers);
    });

    Model.prototype.checkAnswer = function(choice) {
        var question = QUESTIONS[this.questionCurrent];
        if (question.answers[question.correct] === choice) {
            this.score +=1;
        }

        if (this.onAnswerSubmit) {
            this.onAnswerSubmit(this);
        }

    }

    myModel.onAnswerSubmit = (function(myModel.score) {
        console.log("You've gotten" + myModel.score + "out of 4 correct");
    });

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

    // Linked variables
    var questionElement = $('.question');
    var answersElement = $('.answers');
    var questionCurrentElement = $('.question-current');
    var questionsTotalElement = $('.questions-total');
    var scoreElement = $('.score');
    var restartButtonElement = $('.restart-button');

    // Display only variables
    var questionsPageElement = $('.questions-page');
    var resultsPageElement = $('.results-page');

    // Linked Functions
    View.prototype.setQuestion = function(questionIndex) {
        // Keeps track of current question
        var question = QUESTIONS[questionIndex];
        // Displays current question number
        questionCurrentElement.text(questionIndex);
        // Displays current question text
        questionElement.text(question.text);
        // Empties answersElement
        answersElement.empty();
        // Iterates through answers for current question
        for (var i = 0; i < question.answers.length; i++) {
            // sets answers to variable
            var answer = question.answers[i];
            // prints to answers element
            answersElement.append('<li><button type="button">' + answer + '</button></li>');
        }
    };

    // click function
    answersElement.on('click', 'button', function() {
        // takes the index from the answer the user clicked
        var choice = $(this).parent().index();
        // keeps track of the question index
        var questionIndex = parseInt(questionCurrentElement.text(), 10);
        // calls checkAnswers function
        checkAnswers(choice, questionIndex);
    });
    // increases score for each correct answer
    var increaseScore = function() {
        var score = parseInt(scoreElement.text(), 10);
        scoreElement.text(score + 1);
    };
    // restarts game and zeros variables
    restartButtonElement.click(function() {
        setQuestion(0);
        resetScore();
        showQuestions();
    });

    var resetScore = function() {
        scoreElement.text(0);
    };

    // Display Only Functions
    var showResults = function() {
        questionsPageElement.hide();
        resultsPageElement.show();
    };

    var showQuestions = function() {
        resultsPageElement.hide();
        questionsPageElement.show();
    };
    /*============ CONTROLLER ============*/

    model.onChangeQuestionNumber = view.

document.addEventListener('DOMContentLoaded', function() {
    var model = new Model();
    var view = new View();
    var controller = new Controller(model, view);
});

    $(document).ready(function() {
        questionsTotalElement.text(QUESTIONS.length);
        setQuestion(0);
    });