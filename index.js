    /*============ MODEL ============*/

    var Model = function() {
        this.questionText = "";
        this.answers = [];
        this.questionCurrent = 0;
        this.score = 0;

        this.onChangeQuestionNumber = null;
        this.onAnswerSubmit = null;
    };


    Model.prototype.questionNumber = function(questionIndex) {
        this.questionCurrent = questionIndex;
        this.questionText = QUESTIONS[questionIndex].text;
        this.answers = QUESTIONS[questionIndex].answers;

        if (this.onChangeQuestionNumber) {
            this.onChangeQuestionNumber(this);
        }

    }

    Model.prototype.checkAnswer = function(choice) {
        var question = QUESTIONS[this.questionCurrent];
        if (question.answers[question.correct] === choice) {
            this.score +=1; 
        }
        if (this.questionCurrent + 1 < QUESTIONS.length) {
            this.questionCurrent +=1;
        }
        if (this.onScoreChange) {
            this.onScoreChange(score);
        }


    }

    //  var myModel = new Model();


    // // change myModel to model instance
    // myModel.onChangeQuestionNumber = function(model) {
    //     console.log("Question" + (myModel.questionCurrent + 1) + ": " + myModel.questionText);
    //     console.log(myModel.answers);
    // };

    // myModel.onAnswerSubmit = function(model) {
    //     console.log("You've gotten" + myModel.score + "out of 4 correct");
    // };

   

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

    var View = function(model) {
        this.model = model;
        // Linked variables
        this.questionElement = $('.question');
        this.answersElement = $('.answers');
        this.questionCurrentElement = $('.question-current');
        this.questionsTotalElement = $('.questions-total');
        this.scoreElement = $('.score');
        this.restartButtonElement = $('.restart-button');
        
        this.onChangeQuestionNumber = null;
        this.onAnswerSubmit = null;

        this.answersElement.on('click', 'button', function() {
        onAnswerClick();
         
        });

        // Display only variables
        this.questionsPageElement = $('.questions-page');
        this.resultsPageElement = $('.results-page');
       
    };


    // Linked Functions
    View.prototype.setQuestion = function(model) {
        // Displays current question number
        this.questionCurrentElement.text(model.questionCurrent);
        // Displays current question text
        this.questionElement.text(model.questionText);
        // Empties answersElement
        this.answersElement.empty();
        // click function

        // Iterates through answers for current question
        for (var i = 0; i < model.answers.length; i++) {
            // sets answers to variable
            var answer = model.answers[i];
            // prints to answers element
            this.answersElement.append('<li><button type="button">' + answer + '</button></li>');
        }
    };

    // click function
    View.prototype.onAnswerClick = function() {
        // takes the index from the answer the user clicked
        var choice = $(this).parent().index();
        if (this.onAnswerSubmit) {
            this.onAnswerSubmit(choice);
        }


        // showResults();
        
    };

    View.prototype.updateScore = function(score) {
        this.scoreElement.text(score);

        View.setQuestion(model);

    };
    
    // // increases score for each correct answer
    // var increaseScore = function() {
    //     var score = parseInt(scoreElement.text(), 10);
    //     scoreElement.text(score + 1);
    // };
    // // restarts game and zeros variables
    // restartButtonElement.click(function() {
    //     setQuestion(0);
    //     resetScore();
    //     showQuestions();
    // });

    // var resetScore = function() {
    //     scoreElement.text(0);
    // };

    // // Display Only Functions
    // var showResults = function() {
    //     questionsPageElement.hide();
    //     resultsPageElement.show();
    // };

    // var showQuestions = function() {
    //     resultsPageElement.hide();
    //     questionsPageElement.show();
    // };



    /*============ CONTROLLER ============*/

    var Controller = function(model, view) {
        view.onChangeQuestionNumber = model.questionNumber.bind(model);
        model.onChangeQuestionNumber = view.setQuestion.bind(view);

        view.onAnswerSubmit = model.checkAnswer.bind(model);

        model.onScoreChange = view.updateScore.bind(view);
    };

document.addEventListener('DOMContentLoaded', function() {
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);

    view.setQuestion(0);
});

