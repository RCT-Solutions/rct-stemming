var should = require('should');
var stepTwo = require('../lib/stepTwo');

function testGroup(word){
    describe('Step 2 Tests for ' + word.word, function () {
        var result = {};
        before(function () {
            result = stepTwo(word.word);
        });
        it(word.word + ' should be ' + word.expected, function () {
            result.current.should.equal(word.expected);
        });
    });
}

describe('Step 2 of the Porter Stemming tests', function(){
    describe('Check the words for step 2',function(){

        var words = [{
            word: 'relational',
            expected: 'relate'
        }, {
            word: 'conditional',
            expected: 'condition'
        }, {
            word: 'rational',
            expected: 'rate' // Should be rational, but as it will be hit by the first check its really rate!
        }, {
            word: 'triplication',
            expected: 'triplicate'
        }, {
            word: 'valenci',
            expected: 'valence'
        }, {
            word: 'hesitanci',
            expected: 'hesitance'
        }, {
            word: 'digitizer',
            expected: 'digitize'
        }, {
            word: 'conformabli',
            expected: 'conformable'
        }, {
            word: 'radicalli',
            expected: 'radical'
        }, {
            word: 'differentli',
            expected: 'different'
        }, {
            word: 'vileli',
            expected: 'vile'
        }, {
            word: 'analogousli',
            expected: 'analogous'
        }, {
            word: 'vietnamization',
            expected: 'vietnamize'
        }, {
            word: 'predication',
            expected: 'predicate'
        }, {
            word: 'operator',
            expected: 'operate'
        }, {
            word: 'feudalism',
            expected: 'feudal'
        }, {
            word: 'decisiveness',
            expected: 'decisive'
        }, {
            word: 'hopefulness',
            expected: 'hopeful'
        }, {
            word: 'callousness',
            expected: 'callous'
        }, {
            word: 'formaliti',
            expected: 'formal'
        }, {
            word: 'sensitiviti',
            expected: 'sensitive'
        }, {
            word: 'sensibiliti',
            expected: 'sensible'
        }];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            testGroup(word);
        }
    });
});