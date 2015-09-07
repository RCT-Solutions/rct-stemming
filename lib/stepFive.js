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
    var result = utils.createResult(word);

    step5a(result);
    step5b(result);

    if(result.current === ''){
        result.current = result.original;
    }
    return result;
}

module.exports = execute;