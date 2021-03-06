'use strict';
var stats = require('./statistics');

var shortVowels = ['a','e', 'i', 'o', 'u'];
var vowels = ['a','e', 'i', 'o', 'u', 'y'];
var longVowels = ['a', 'e', 'i', 'o', 'u',  'w', 'x', 'y'];

function letterCheck(character, letters) {
    if (character === undefined){
        return false;
    }
    if (character === letters[0]) {
        return true;
    }
    var remains = letters.slice(1);
    if (remains.length > 0) {
        return letterCheck(character, remains);
    }
    return false;
}

function isVowel(letter, isShort){
    if(isShort === undefined){
        isShort = false;
    }
    return letterCheck(letter, isShort ? shortVowels : vowels);
}

function isShortVowel(letter){
    return letterCheck(letter, shortVowels);
}

function isLongVowel(letter){
    return letterCheck(letter, longVowels);
}

function contains(word, letters){
    if(letterCheck(word[0], letters)){
        return true;
    }
    var remains = word.slice(1);
    if(remains.length > 0){
        return contains(remains, letters);
    }
    return false;
}

function containsVowel(word, isShort){
    if(isShort === undefined){
        isShort = false;
    }
    return contains(word, isShort ? shortVowels : vowels);
}

function containsLongVowel(word){
    return contains(word, longVowels);
}

function doubleCheck(result){
    var pass = false;
    var last = result.test[result.test.length-1];
    if( result.test[result.test.length-2] === last){
        pass = true;
    }
    return pass;
}

function cvcCheck(result){
    var pass = false;
    var end = result.test.length -1;
    var l1 = result.test[end-2];
    var l2 = result.test[end-1];
    var l3 = result.test[end];
    if( isVowel(l1, true) === false && isVowel(l2, true) && isVowel(l3, true) === false){
        if( letterCheck(l3, ['w', 'x', 'y']) === false) {
            pass = true;
        }
    }
    return pass;
}

function checkEnding(result, ending, replace, force) {
    if(force === undefined){
        force = false;
    }
    var passed = false;
    if (result.test.length > ending.length ) {
        if (result.test.substr(result.test.length - ending.length) === ending) {
            var test = result.original.substr(0, result.test.length - ending.length) + replace.trim();
            if( test.length > result.current.length || force) {
                result.current = test;
                result.test = result.current.toLowerCase();
                result.rulePassed = true;
                passed = true;
                result.stats = stats.statistics(result.test);
            }
        }
    }
    return passed;
}

function createResult(word){
    var result = {
        original: word,
        stats: {},
        current: '',
        test: '',
        length: 0,
        rulePassed: false,
        skipped: false
    };

    result.test = word.toLowerCase();
    result.stats = stats.statistics(word);
    return result;
}

function longestWord(words){
    var sorted = words.sort(function(a,b){return a.length < b.length;})
    return sorted[0];
}

module.exports = function(){
    return {
        isVowel: isVowel,
        isShortVowel: isShortVowel,
        isLongVowel: isLongVowel,
        containsVowel: containsVowel,
        containsLongVowel: containsLongVowel,
        checkEnding: checkEnding,
        createResult: createResult,
        letterCheck: letterCheck,
        contains:contains,
        cvcCheck:cvcCheck,
        doubleCheck:doubleCheck,
        longestWord: longestWord
    };
};

