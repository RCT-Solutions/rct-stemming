var step1 = require('./stepOne');
var step2 = require('./stepTwo');
var step3 = require('./stepThree');
var step4 = require('./stepFour');
var step5 = require('./stepFive');
var utils = require('./utils')();

module.exports.run = function (word) {
    var result = {};
    if (typeof word === 'string') {
        result = utils.createResult(word);
    } else if (typeof word !== 'object') {
        throw 'Expecting either a string or a result object!';
    } else {
        result = word;
    }

    var steps = [{
        step: step1
    }, {
        step: step2
    }, {
        step: step3
    }, {
        step: step4
    }, {
        step: step5
    }];

    var words = [];

    for(var i = 0; i < steps.length; i++){
        steps[i].step(result);
        if(result.current !== result.original && result.current !== ''){
            words.push(result.current);
        }
        result.current = '';
        result.test = result.original.toLocaleLowerCase();
    }

    result.current = utils.longestWord(words);

    // If we have not updated the word then just set it to the original
    if( result.current === undefined || result.current === '' )
    {
        result.current = result.original;
    }
    return result.current;
};