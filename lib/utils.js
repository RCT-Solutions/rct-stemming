'use strict';
var stats = require('./statistics');

var shortVowels = ['a','e', 'i', 'o', 'u'];
var vowels = ['a','e', 'i', 'o', 'u', 'y'];
var longVowels = ['a', 'e', 'i', 'o', 'u',  'w', 'x', 'y'];


function vowelCheck(character, vowels) {
    if (character === vowels[0]) {
        return true;
    }
    var remains = vowels.slice(1);
    if (remains.length > 0) {
        return vowelCheck(character, remains);
    }
    return false;
}

function isVowel(letter, isShort){
    if(isShort === undefined){
        isShort = false;
    }
    return vowelCheck(letter, isShort ? shortVowels : vowels);
}

function isShortVowel(letter){
    return vowelCheck(letter, shortVowels);
}

function isLongVowel(letter){
    return vowelCheck(letter, longVowels);
}

function containsVowel(word, isShort){
    if(isVowel(word[0], isShort)){
        return true;
    }
    var remains = word.slice(1);
    if(remains.length > 0){
        return containsVowel(remains, isShort);
    }
    return false;
}


function containsLongVowel(word){
    if(isLongVowel(word[0])){
        return true;
    }
    var remains = word.slice(1);
    if(remains.length > 0){
        return containsLongVowel(remains);
    }
    return false;
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
        skipped: true
    };

    result.test = word.toLowerCase();
    result.stats = stats.statistics(word);
    return result;
}

module.exports = function(){
    return {
        isVowel: isVowel,
        isShortVowel: isShortVowel,
        isLongVowel: isLongVowel,
        containsVowel: containsVowel,
        containsLongVowel: containsLongVowel,
        checkEnding: checkEnding,
        createResult: createResult
    };
};

