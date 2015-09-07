var utils = require('./utils')();

var checks = [
    {ending: 'ational', replace: 'ate'},
    {ending: 'tional', replace: 'tion'},
    {ending: 'enci', replace: 'ence'},
    {ending: 'anci', replace: 'ance'},
    {ending: 'izer', replace: 'ize'},
    {ending: 'abli', replace: 'able'},
    {ending: 'alli', replace: 'al'},
    {ending: 'entli', replace: 'ent'},
    {ending: 'eli', replace: 'e'},
    {ending: 'ousli', replace: 'ous'},
    {ending: 'ization', replace: 'ize'},
    {ending: 'ation', replace: 'ate'},
    {ending: 'ator', replace: 'ate'},
    {ending: 'alism', replace: 'al'},
    {ending: 'iveness', replace: 'ive'},
    {ending: 'fulness', replace: 'ful'},
    {ending: 'ousness', replace: 'ous'},
    {ending: 'aliti', replace: 'al'},
    {ending: 'iviti', replace: 'ive'},
    {ending: 'biliti', replace: 'ble'}
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
    if (utils.letterCheck(letter, ['a', 'c', 'e', 'l', 'o', 's', 't']) === false) {
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