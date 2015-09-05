'use strict';

var constants = require('./constants')();

function vowelCheck(character, vowels){
    if( character === vowels[0]){
        return true;
    }
    var remains = vowels.slice(1);
    if( remains.length > 0 ){
        return vowelCheck(character, remains);
    }
    return false;
}

function letterCheck(word, stats){

    if(word[0] != undefined){
        var isVowel = vowelCheck(word[0], constants.vowels);
        stats.consonants += isVowel ? 0 : 1;
        stats.vowels += isVowel ? 1 : 0;
        // If vowel and consonants > 0 then check next letter
        if( isVowel ){
            if(stats.consonants > 0 && word.length > 1) {
                if (vowelCheck(word[1], constants.vowels) === false) {
                    stats.measure++;
                }
            }
        } else {
            // R1 is first VC
            if ( stats.vowels > 0 && stats.region1 === -1) {
                stats.region1 = stats.position;
            }

            // R2 is first VCVC
            if ( stats.measure === 2 && stats.region2 === -1){
                stats.region2 = stats.position;
            }
        }
    }
    stats.position ++;
    var remains = word.slice(1);
    if( remains.length > 0 ){
        letterCheck(remains, stats);
    }
}

function statistics(word){
    var stats = {
        word: word,
        length: word.length,
        position: 0,
        consonants:0,
        vowels:0,
        measure:0,
        region1:-1,
        region2:-1
    };

    letterCheck(word, stats);
    return stats;
}

module.exports = statistics;