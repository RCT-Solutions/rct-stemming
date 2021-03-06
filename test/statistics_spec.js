var should = require('should');
var stemming = require('../lib/statistics');

function testGroup(word) {
    describe('Statistics Tests ' + word.word, function () {
        var stats = {};
        before(function () {
            stats = stemming.statistics(word.word);
        });
        it(word.word + ' is ' + word.word, function () {
            stats.word.should.equal(word.word);
        });
        it(word.word + ' has ' + word.consonants + ' consonants', function () {
            stats.consonants.should.equal(word.consonants);
        });
        it(word.word + ' has ' + word.vowels + ' vowels', function () {
            stats.vowels.should.equal(word.vowels);
        });

        it(word.word + ' has a measure of ' + word.measure, function () {
            stats.measure.should.equal(word.measure);
        });
        it(word.word + ' length (' + word.word.length + ') is the same as vowels + consonants', function () {
            var len = stats.vowels + stats.consonants;
            len.should.equal(word.word.length);
            len.should.equal(stats.length);
        });
        it(word.word + ' region 1 starts at ' + word.r1, function () {
            stats.region1.should.equal(word.r1);
        });
        it(word.word + ' region 2 starts at ' + word.r2, function () {
            stats.region2.should.equal(word.r2);
        });
    });
}


describe('Statistics tests', function () {
    var words = [{
        word: 'crepuscular',
        consonants: 7,
        measure: 4,
        vowels: 4,
        r1: 4,
        r2: 6
    }, {
        word: 'look',
        consonants: 2,
        measure: 0,
        vowels: 2,
        r1: -1,
        r2: -1
    }, {
        word: 'caresses',
        consonants: 5,
        measure: 3,
        vowels: 3,
        r1: 3,
        r2: 5
    }, {
        word: 'agreed',
        consonants: 3,
        measure: 1,
        vowels: 3,
        r1: 2,
        r2: -1
    }, {
        word: 'feed',
        consonants: 2,
        vowels: 2,
        measure: 0,
        r1: -1,
        r2: -1
    }, {
        word: 'fil',
        consonants: 2,
        vowels: 1,
        measure: 1,
        r1: -1,
        r2: -1
    }];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        testGroup(word);
    }

});
