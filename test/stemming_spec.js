var should = require('should');
var stemming = require('../lib/stemming');

function testGroup(word) {
    describe('Full Stemming Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stemming.run(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.should.equal(word.expected);
        });
    });
}

describe('Porter Stemming tests', function () {
    describe('Check the words for full run', function () {

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