var should = require('should');
var stepThree = require('../lib/stepThree');

function testGroup(word){
    describe('Step 3 Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stepThree(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.current.should.equal(word.expected);
        });
    });
}

describe('Step 3 of the Porter Stemming tests', function(){
    describe('Check that bypass works', function () {
        it('The word help will skip', function () {
            var result = stepThree('help');

            result.skipped.should.equal(true);
        });
        it('The word active will NOT skip', function () {
            var result = stepThree('active');

            result.skipped.should.equal(false);
        });
    });
    describe('Check the words for step 3',function(){

        var words = [{
            word: 'triplicate',
            expected: 'triplic'
        }, {
            word: 'formative',
            expected: 'form'
        }, {
            word: 'formalize',
            expected: 'formal'
        }, {
            word: 'electriciti',
            expected: 'electric'
        }, {
            word: 'electrical',
            expected: 'electric'
        }, {
            word: 'hopeful',
            expected: 'hope'
        }, {
            word: 'goodness',
            expected: 'good'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            testGroup(word);
        }
    });
});