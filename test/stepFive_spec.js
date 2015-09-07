var should = require('should');
var stepFive = require('../lib/stepFive');

function testGroup(word) {
    describe('Step 5 Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stepFive(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.current.should.equal(word.expected);
        });
    });
}

describe('Step 5 of the Porter Stemming tests', function () {
    describe('Check the words for step 5', function () {

        var words = [{
            word: 'probate',
            expected: 'probat'
        }, {
            word: 'rate',
            expected: 'rat'
        }, {
            word: 'cease',
            expected: 'cease'
        }, {
            word: 'controll',
            expected: 'control'
        }, {
            word: 'roll',
            expected: 'roll'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            testGroup(word);
        }
    });
});