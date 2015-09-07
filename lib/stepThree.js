var utils = require('./utils')();

var checks = [
    {ending: 'icate', replace: 'ic'},
    {ending: 'ative', replace: ''},
    {ending: 'alize', replace: 'al'},
    {ending: 'iciti', replace: 'ic'},
    {ending: 'ical', replace: 'ic'},
    {ending: 'ful', replace: ''},
    {ending: 'ness', replace: ''}
];

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
    // Check if we need to skip.
    var letter = result.test[result.test.length - 2];
    if (utils.letterCheck(letter, ['a', 's', 't','u', 'v', 'z']) === false) {
        result.skipped = true;
    }

    if (result.skipped === false) {
        for (var i = 0; i < checks.length; i++) {
            var check = checks[i];
            if (result.stats.measure > 0) {
                utils.checkEnding(result, check.ending, check.replace);
            }
        }
    }

    // If we have not updated the word then just set it to the original
    if( result.current === '' )
    {
        result.current = result.original;
    }
    return result;
}

module.exports = execute;