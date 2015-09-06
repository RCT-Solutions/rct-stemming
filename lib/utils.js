'use strict';

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


module.exports = function(){
    return {
        isVowel: isVowel,
        isShortVowel: isShortVowel,
        isLongVowel: isLongVowel,
        containsVowel: containsVowel,
        containsLongVowel: containsLongVowel
    };
};

