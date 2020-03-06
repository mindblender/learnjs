'use strict';
let learnjs = {};

learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() { return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 === 6 * __; }"
    }
];

learnjs.appOnReady = function () {
    window.onhashchange = function () {
        learnjs.showView(window.location.hash);
    };

    learnjs.showView(window.location.hash);
};

learnjs.applyObject = function (obj, elem) {
    for (let key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
};

learnjs.landingView = function () {
    return learnjs.template('landing-view');
};

learnjs.problemView = function (data) {
    let problemNumber = parseInt(data, 10);
    let view = $('.templates .problem-view').clone();
    let problemData = learnjs.problems[problemNumber - 1];
    let resultFlash = view.find('.result');

    if (problemNumber < learnjs.problems.length) {
        let buttonItem = learnjs.template('skip-btn');
        buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
        $('.nav-list').append(buttonItem);
        view.bind('removingView', function () {
            buttonItem.remove();
        })
    }

    function checkAnswer() {
        let answer = view.find('.answer').val();
        let test = problemData.code.replace('__', answer) + '; problem();';
        return eval(test);
    }

    function checkAnswerClick() {
        if (checkAnswer()) {
            // let correctFlash = learnjs.template('correct-flash');
            // correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1));
            // learnjs.flashElement(resultFlash, correctFlash);
            // learnjs.buildCorrectFlash(problemNumber);
            learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber))
        } else {
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false;
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData, view);
    return view;
};

learnjs.showView = function (hash) {
    let routes = {
        '#problem': learnjs.problemView,
        '#': learnjs.landingView,
        '': learnjs.landingView
    };
    let hashParts = hash.split('-');
    let viewFn = routes[hashParts[0]];
    if (viewFn) {
        learnjs.triggerEvent('removingView', []);
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
};

learnjs.flashElement = function (elem, content) {
    elem.fadeOut('fast', function () {
        elem.html(content);
        elem.fadeIn();
    })
};

learnjs.buildCorrectFlash = function (problemNum) {
    let correctFlash = learnjs.template('correct-flash');
    let link = correctFlash.find('a');
    console.log(problemNum);
    console.log(learnjs.problems.length);
    if (problemNum < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNum + 1));
    } else {
        link.attr('href', '');
        link.text('You\'re Finished!');
    }
    return correctFlash;
};

learnjs.template = function (name) {
    return $('.templates .' + name).clone();
};

learnjs.triggerEvent = function(name, args) {
    $('.view-container>*').trigger(name, args);
}