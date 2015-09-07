var utils = require('./utils')();

function step5a(result){
    if( result.stats.measure > 1){
        utils.checkEnding(result, 'e', '');
    }
    if(result.stats.measure === 1 && utils.cvcCheck(result) === false){
        utils.checkEnding(result, 'e', '');
    }
}

function step5b(result) {
    if( result.stats.measure > 1){
        if(utils.doubleCheck(result)){
            utils.checkEnding(result, 'l', '');
        }
    }
}

function execute(word) {
    var result = {};
    if (typeof word === 'string') {
        result = utils.createResult(word);
    } else if (typeof word !== 'object') {
        throw 'Expecting either a string or a result object!';
    } else {
        result = word;
    }

    // Reset if same
    if( result.current === result.original){
        result.current = '';
    }

    step5a(result);
    step5b(result);

    // If we have not updated the word then just set it to the original
    if( result.current === '' )
    {
        result.current = result.original;
    }
    return result;
}

module.exports = execute;