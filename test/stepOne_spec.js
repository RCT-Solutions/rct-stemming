var should = require('should');
var stepOne = require('../lib/stepOne');

function testGroup(word){
    describe('Step 1 Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stepOne(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.current.should.equal(word.expected);
        });
    });
}

describe('Step 1 of the Porter Stemming tests', function () {
    describe('Check that bypass works', function () {
        it('The word help will use skip', function () {
            var result = stepOne('help');

            result.skipped.should.equal(true);
        });
        it('The word caresses will use NOT skip', function () {
            var result = stepOne('caresses');

            result.skipped.should.equal(false);
        });
    });

    describe('Check the words for step 1', function(){

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
        }, {
            word: 'feed',
            expected: 'fe'
        }, {
            word: 'agreed',
            expected: 'agree'
        }, {
            word: 'plastered',
            expected: 'plaster'
        }, {
            word: 'bled',
            expected: 'bled'
        }, {
            word: 'motoring',
            expected: 'motor'
        }, {
            word: 'sing',
            expected: 'sing'
        }, {
            word: 'singing',
            expected: 'sing'
        }, {
            word: 'conflated',
            expected: 'conflate'
        }, {
            word: 'troubled',
            expected: 'trouble'
        }, {
            word: 'sized',
            expected: 'size'
        }, {
            word: 'hopping',
            expected: 'hop'
        }, {
            word: 'tanned',
            expected: 'tan'
        }, {
            word: 'falling',
            expected: 'fall'
        }, {
            word: 'hissing',
            expected: 'hiss'
        }, {
            word: 'fizzed',
            expected: 'fizz'
        }, {
            word: 'failing',
            expected: 'fail'
        }, {
            word: 'filing',
            expected: 'file'
        }, {
            word: 'happy',
            expected: 'happi'
        }, {
            word: 'sky',
            expected: 'sky'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            testGroup(word);
        }
    });
});