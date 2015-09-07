var utils = require('./utils')();
var stats = require('./statistics');

var checks = [
    {ending:'ational', replace:'ate'},
    {ending:'tional', replace:'tion'},
    {ending:'enci', replace:'ence'},
    {ending:'anci', replace:'ance'},
    {ending:'izer', replace:'ize'},
    {ending:'abli', replace:'able'},
    {ending:'alli', replace:'al'},
    {ending:'entli', replace:'ent'},
    {ending:'eli', replace:'e'},
    {ending:'ousli', replace:'ous'},
    {ending:'ization', replace:'ize'},
    {ending:'ation', replace:'ate'},
    {ending:'ator', replace:'ate'},
    {ending:'alism', replace:'al'},
    {ending:'iveness', replace:'ive'},
    {ending:'fulness', replace:'ful'},
    {ending:'ousness', replace:'ous'},
    {ending:'aliti', replace:'al'},
    {ending:'iviti', replace:'ive'},
    {ending:'biliti', replace:'ble'}
];

function execute(word){
    var result = utils.createResult(word);
    for(var i =0;i< checks.length;i++){
        var check = checks[i];
        if(result.stats.measure > 0) {
            utils.checkEnding(result, check.ending, check.replace);
        }
    }
    result.stats = stats.statistics(result.test);
    return result;
}

module.exports = execute;