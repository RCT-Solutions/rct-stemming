var utils = require('./utils')();

var checks = [
    {ending: 'al', replace: ''},
    {ending: 'ance', replace: ''},
    {ending: 'ence', replace: ''},
    {ending: 'er', replace: ''},
    {ending: 'ic', replace: ''},
    {ending: 'able', replace: ''},
    {ending: 'ible', replace: ''},
    {ending: 'ant', replace: ''},
    {ending: 'ement', replace: ''},
    {ending: 'ment', replace: ''},
    {ending: 'ent', replace: ''},
    {ending: 'ou', replace: ''},
    {ending: 'ism', replace: ''},
    {ending: 'ate', replace: ''},
    {ending: 'iti', replace: ''},
    {ending: 'ous', replace: ''},
    {ending: 'ive', replace: ''},
    {ending: 'ize', replace: ''}
];

function execute(word) {
    var result = utils.createResult(word);

    if (result.skipped === false) {
        for (var i = 0; i < checks.length; i++) {
            var check = checks[i];
            if (result.stats.measure > 1) {
                utils.checkEnding(result, check.ending, check.replace);
            }
        }

        if(result.current.length > 5) {
            var c =  result.current[result.current.length -5];
            if( c === 's' || c === 't') {
                if (result.stats.measure > 1) {
                    utils.checkEnding(result, 'ion', '');
                }
            }
        }

        if(result.current === ''){
            result.current = result.original;
        }
    }
    return result;
}

module.exports = execute;