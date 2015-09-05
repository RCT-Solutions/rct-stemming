function checkEnding(result, ending, replace) {
    var passed = false;
    if (result.test.length > ending.length && result.rulePassed === false) {
        if (result.test.substr(result.test.length - ending.length) === ending) {
            result.current = result.stats.word.substr(0, result.test.length - ending.length) + replace.trim();
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

function execute(stats) {
    var result = {
        stats: stats,
        current: '',
        test: '',
        length: 0,
        rulePassed: false,
        skipped: true
    };

    if (stats === undefined) {
        return result;
    }

    result.test = stats.word.toLowerCase();

    // Quick test to see if can by pass this step.
    // Step 1a relies on the fact the last letter is a s
    // so lets check the last letter and if not an s return

    if (result.test[result.test.length - 1] === 's') {
        result.skipped = false;
        // It is a word to be checked
        step1a(result);
    }


    return result;
}


module.exports = execute;