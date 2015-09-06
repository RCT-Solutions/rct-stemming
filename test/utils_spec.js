var should = require('should');
var utils = require('../lib/utils')();

describe('Testing the utils functions', function(){
    describe('Checking if a vowel or not', function(){
        it('a is vowel', function(){
            var actual = utils.isVowel('a');
            actual.should.equal(true);
        });
        it('b is not avowel', function(){
            var actual = utils.isVowel('b');
            actual.should.equal(false);
        });
        it('y is a special vowel', function(){
            var actual = utils.isVowel('y');
            actual.should.equal(true);
        });
        it('y is not a short vowel', function(){
            var actual = utils.isVowel('y', true);
            actual.should.equal(false);
        });
    });

    describe('Checking a word contains a vowel', function(){
        it('look contains a vowel', function(){
            var actual = utils.containsVowel('look');
            actual.should.equal(true);
        });
        it('sky does contains a short vowel', function(){
            var actual = utils.containsVowel('sky');
            actual.should.equal(true);
        });
        it('sky does not contains a vowel', function(){
            var actual = utils.containsVowel('sky', true);
            actual.should.equal(false);
        });
        it('sky does not contains a long vowel', function(){
            var actual = utils.containsLongVowel('sky');
            actual.should.equal(true);
        });
    });
});