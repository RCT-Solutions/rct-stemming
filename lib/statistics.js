'use strict';

var utils = require('./utils')();

function letterCheck(word, stats, position) {

    if (word[0] != undefined) {
        var isVowel = utils.isVowel(word[0]);
        stats.consonants += isVowel ? 0 : 1;
        stats.vowels += isVowel ? 1 : 0;
    }

    var remains = word.slice(1);
    if (remains.length > 0) {
        position++;
        stats.lastWasConsonant = isVowel ? false : true;
        letterCheck(remains, stats, position);
    }
}


// To calculate measure we use the following formula
// [C][VC]m[C]
//
// check if we have C before VC if VC is not at start
// count the number for combination of VC
// check if we have C after VC

function calculateMeasure(word, position, measure) {
    var l1 = '';
    var l2 = word[position];
    var l3 = word[position + 1];
    if (position > 0) {
        l1 = word[position - 1];
    }
    // Its a VC
    if (utils.isVowel(l2) && utils.isVowel(l3) === false) {
        if (l1 === '' || utils.isVowel(l1) === false) {
            measure++;
        }
    }
    if (position < word.length) {
        position++;
        return calculateMeasure(word, position, measure);
    }
    return measure;
}

//Region 1 is the right of the first VC
function calculateRegion1(word, position){
    var l1 = word[position];
    var l2 = word[position+1];
    if (utils.isVowel(l1) && utils.isVowel(l2) === false) {
        var len = word.length - position -1;
        if(len > 2) {
            return position + 2;
        } else {
            return -1;
        }
    }
    if(position < word.length){
        position++;
        return calculateRegion1(word, position);
    }
    return -1;
}

//Region 2 is the right of the second VC
function calculateRegion2(word, position){
    if(position === -1){
        return -1;
    }
    var l1 = word[position];
    var l2 = word[position+1];
    if (utils.isVowel(l1) && utils.isVowel(l2) === false) {
        return position + 2;
    }
    if(position < word.length){
        position++;
        return calculateRegion1(word, position);
    }
    return -1;
}

function statistics(word) {
    var stats = {
        word: word,
        length: word.length,
        consonants: 0,
        vowels: 0,
        measure: 0,
        region1: -1,
        region2: -1,
        lastWasConsonant: false
    };

    stats.measure = calculateMeasure(word, 0, 0);
    stats.region1 = calculateRegion1(word, 0);
    stats.region2 = calculateRegion2(word, stats.region1);
    letterCheck(word, stats, 0);
    return stats;
}

module.exports = statistics;