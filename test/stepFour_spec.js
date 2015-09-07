var should = require('should');
var stepFour = require('../lib/stepFour');

function testGroup(word){
    describe('Step 4 Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stepFour(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.current.should.equal(word.expected);
        });
    });
}

describe('Step 4 of the Porter Stemming tests', function(){
    describe('Check the words for step 4',function(){

        var words = [{
            word: 'revival',
            expected: 'reviv'
        }, {
            word: 'allowance',
            expected: 'allow'
        }, {
            word: 'inference',
            expected: 'infer'
        }, {
            word: 'gyroscopic',
            expected: 'gyroscop'
        }, {
            word: 'adjustable',
            expected: 'adjust'
        }, {
            word: 'defensible',
            expected: 'defens'
        }, {
            word: 'irritant',
            expected: 'irrit'
        }, {
            word: 'replacement',
            expected: 'replac'
        }, {
            word: 'adjustment',
            expected: 'adjust'
        }, {
            word: 'dependent',
            expected: 'depend'
        }, {
            word: 'homologou',
            expected: 'homolog'
        }, {
            word: 'commonism',
            expected: 'common'
        }, {
            word: 'activate',
            expected: 'activ'
        }, {
            word: 'angulariti',
            expected: 'angular'
        }, {
            word: 'homologous',
            expected: 'homolog'
        }, {
            word: 'effective',
            expected: 'effect'
        }, {
            word: 'bowdlerize',
            expected: 'bowdler'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            testGroup(word);
        }
    });
});