describe('LearnJS', function () {
    it('invokes the router when loaded', function () {
        spyOn(learnjs, 'showView');
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    it('subscribes to the hash change event', function () {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    it('can show a problem view', function () {
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });
    it('shows the landing page view when there is no hash', function () {
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });
    it('passes the hash view parameter to the view function', function () {
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });

/*
    describe('problem view', function () {
        it('has a title that includes the problem number', function () {
            var view = learnjs.problemView('1');
            expect(view.text()).toEqual('Problem #1 Coming soon!');
        });
    });
*/
/*
    describe('answer section', function () {
        var view = learnjs.problemView('1');
        it('can check a correct answer by hitting a button', function () {
            view.find('.answer').val('true');
            view.find('.check-btn').click();
            expect(view.find('.result').test()).toEqual('Correct!');
        });
        it('rejects an incorrect answer', function () {
            view.find('.answer').val('false');
            view.find('.check-btn').click();
            expec(view.find('.result').text()).toEqual('Incorrect!');
        });
    })*/
});