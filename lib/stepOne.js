var utils = require('./utils')();
var statistics = require('./statistics');

function checkEnding(result, ending, replace) {
    var passed = false;
    if (result.test.length > ending.length && result.rulePassed === false) {
        if (result.test.substr(result.test.length - ending.length) === ending) {
            result.current = result.stats.word.substr(0, result.test.length - ending.length) + replace.trim();
            result.test = result.current.toLowerCase();
            result.rulePassed = true;
            passed = true;
        }
    }
    return passed;
}

function step1a(result) {
    checkEnding(result, 'sses', 'ss');
    checkEnding(result, 'ies', 'i');
    checkEnding(result, 'ss', 'ss');
    checkEnding(result, 's', '');
}

function step1b(result){
    var doSubStep = false;
    if(result.stats.measure > 0){
        checkEnding(result, 'eed', 'ee');
    }

    //(*V*) means that there is a vowel before check the ending
    if(result.stats.vowels > 1){
        var t1 = checkEnding(result, 'ed', '');
        var t2 = checkEnding(result, 'ing', '');
        doSubStep = t1 || t2 ? true : false;
    }

    // Only need to do if rule 2/3 are triggered
    if(doSubStep){
        result.rulePassed = false;
        checkEnding(result, 'at', 'ate');
        checkEnding(result, 'bl', 'ble');
        checkEnding(result, 'iz', 'ize');
        // this one is fun, need double letter ending to be reduced to one, but
        // only if the ending letters are not L, S or Z
        result.stats = statistics(result.test);
        var last = result.test[result.test.length-1];
        if(last !== 'l' && last !== 's' && last !== 'z'){
            // check if we have double letter.
            if( result.test[result.test.length-2] === last){
                checkEnding(result, last, '');
            }
        }
        // Does the stem end in CVC and 2nd C is not WXY
        result.stats = statistics(result.test);
        if(result.stats.measure === 1 && result.rulePassed === false && result.test.length > 2){
            var end = result.test.length -1;
            var l1 = result.test[end-2];
            var l2 = result.test[end-1];
            var l3 = result.test[end];
            if( utils.isVowel(l1) === false && utils.isVowel(l2) && utils.isLongVowel(l3) === false){
                var lastLetter = result.test[result.test.length-1];
                checkEnding(result, lastLetter, lastLetter + 'e');
            }
        }
    }
}

function step1c(result){
    if( utils.containsVowel(result.test, true) ){
        checkEnding(result, 'y', 'i');
    }
}

function execute(word) {
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
    result.stats = statistics(word);


    // Quick test to see if can by pass this step.
    // Step 1a relies on the fact the last letter is a s
    // so lets check the last letter and if not an s skip it

    if (result.test[result.test.length - 1] === 's') {
        result.skipped = false;
        // It is a word to be checked
        step1a(result);
    }

    step1b(result);
    step1c(result);


    // If we have not updated the word then just set it to the original
    if( result.current === '' )
    {
        result.current = result.stats.word;
    }

    // Make sure the first letter is the same case
    result.current[0] = result.original[0];

    return result;
}


module.exports = execute;