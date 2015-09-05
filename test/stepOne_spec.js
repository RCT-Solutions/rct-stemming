var should = require('should');
var stepOne = require('../lib/stepOne');
var statistics = require('../lib/statistics');

describe('Step 1 of the Porter Stemming tests', function () {
    describe('Check that bypass works', function () {
        it('The word help will use skip', function () {
            var stats = statistics('help');
            var result = stepOne(stats);

            result.skipped.should.equal(true);
        });
        it('The word caresses will use NOT skip', function () {
            var stats = statistics('caresses');
            var result = stepOne(stats);

            result.skipped.should.equal(false);
        });
    });

    describe('Check the words for rule 1a', function(){
        var words = [{
            word: 'caresses',
            expected: 'caress'
        }, {
            word: 'ponies',
            expected: 'poni'
        }, {
            word: 'caress',
            expected: 'caress'
        }, {
            word: 'cats',
            expected: 'cat'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            describe('Step 1 Tests for ' + word.word, function () {
                var result = {};
                before(function () {
                    var stats = statistics(word.word);
                    result = stepOne(stats);
                });
                it(word.word + ' should be ' + word.expected, function () {
                    result.current.should.equal(word.expected);
                });
            });
        }
    });
});