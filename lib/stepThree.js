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
    var result = utils.createResult(word);

    // Check if we need to skip.
    var letter = word[word.length - 2];
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
    return result;
}

module.exports = execute;