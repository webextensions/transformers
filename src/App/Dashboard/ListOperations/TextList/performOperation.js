import {
    removeEmptyLines,
    removeDuplicates,

    trimLines,
    removeCommaCharacterAtEndFromLines,
    removeQuoteAndApostropheCharactersFromLines,

    removeFirstColumnFromCsvLines,
    removeLastColumnFromCsvLines,

    csvToJson,

    fixDataTypes,
    jsonStableStringify,
    jsonToCsv
} from './textUtils.js';

import {
    $list_sample_list,

    $list_removeEmptyLines,
    $list_removeDuplicates,

    $list_sort,
    $list_caseInsensitiveSort,
    $list_naturalSort,
    $list_randomize,
    $list_reverse,

    $list_trimLines,
    $list_removeCommaCharacterAtLineEnds,
    $list_removeQuoteAndApostropheCharacters,

    $list_getStats,

    $list_linesToJsonArray,

    $csv_sample_csv,

    $csv_removeFirstColumnFromCsv,
    $csv_removeLastColumnFromCsv,

    $csv_csvToJson,

    $json_sample_json,

    $json_formatJson,

    $json_sortJson,

    $json_fixDataTypes,

    $json_jsonToLines,
    $json_jsonToCsv
} from './constOperations.js';

const performOperation = async function ({ getInputValue, operation }) {
    try {
        if (
            [
                $json_formatJson,
                $json_sortJson,
                $json_fixDataTypes,
                $json_jsonToLines,
                $json_jsonToCsv
            ].includes(operation)
        ) {
            const input = getInputValue();
            const jsonInput = JSON.parse(input);
            let output;

            switch (operation) {
                case $json_formatJson:
                    output = JSON.stringify(jsonInput, null, 4);
                    break;
                case $json_sortJson:
                    output = jsonStableStringify(jsonInput, { space: '    ' });
                    break;
                case $json_fixDataTypes:
                    output = fixDataTypes(jsonInput);
                    output = JSON.stringify(output, null, 4);
                    break;
                case $json_jsonToLines:
                    if (
                        Array.isArray(jsonInput) &&
                        jsonInput.every(item => typeof item === 'string')
                    ) {
                        output = jsonInput.join('\n');
                    } else {
                        return [new Error('Please provide an Array of Strings as the input.')];
                    }
                    break;
                case $json_jsonToCsv:
                    output = jsonToCsv(jsonInput);
                    break;
            }

            return [null, output];
        } else if (
            [
                $list_getStats
            ].includes(operation)
        ) {
            switch (operation) {
                case $list_getStats:
                {
                    const stats = {};

                    const input = getInputValue();
                    const lines = input.split('\n');
                    stats.linesCount = lines.length;
                    stats.charactersCount = input.length;

                    // Replace all punctuation characters with a single space
                    const inputWithoutPunctuation = input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' '); // eslint-disable-line no-useless-escape

                    // Replace all continuous whitespace characters with a single space
                    const inputWithoutWhitespace = inputWithoutPunctuation.replace(/\s+/g, ' ');

                    const words = inputWithoutWhitespace.split(' ');
                    stats.wordsCount = words.length; // Not a perfect way to count words, but it's good enough for now.

                    stats.uniqueWordsCount = (new Set(words)).size;

                    return [null, null, { stats }];
                }
            }
        } else if (
            [
                $csv_sample_csv,

                $csv_removeFirstColumnFromCsv,
                $csv_removeLastColumnFromCsv,

                $csv_csvToJson,

                $json_sample_json,

                $list_sample_list,

                $list_removeEmptyLines,
                $list_removeDuplicates,

                $list_sort,
                $list_caseInsensitiveSort,
                $list_naturalSort,
                $list_randomize,
                $list_reverse,

                $list_trimLines,
                $list_removeCommaCharacterAtLineEnds,
                $list_removeQuoteAndApostropheCharacters,

                $list_linesToJsonArray
            ].includes(operation)
        ) {
            const input = getInputValue();
            const lines = input.split('\n');

            let output = lines;

            switch (operation) {
                case $csv_sample_csv:
                    output = [
                        'Name,Age,Height',
                        'Charlie,22,1.85',
                        'Bob,21,1.75',
                        'Alice,20,1.65',
                        'David,23,1.95'
                    ];
                    break;
                case $csv_removeFirstColumnFromCsv:
                    output = removeFirstColumnFromCsvLines(lines);
                    break;
                case $csv_removeLastColumnFromCsv:
                    output = removeLastColumnFromCsvLines(lines);
                    break;

                case $csv_csvToJson:
                    output = csvToJson(lines);
                    break;

                case $json_sample_json:
                    output = [
                        '{',
                        '    "data": [',
                        '        { "name": "Charlie", "age": 22, "height": 1.85 },',
                        '        { "name": "Bob",     "age": 21, "height": 1.75 },',
                        '        { "name": "Alice",   "age": 20, "height": 1.65 },',
                        '        { "name": "David",   "age": 23, "height": 1.95 }',
                        '    ]',
                        '}'
                    ];
                    break;

                case $list_sample_list:
                    output = [
                        'Charlie',
                        'Bob',
                        'Alice',
                        'David'
                    ];
                    break;

                case $list_removeEmptyLines:
                    output = removeEmptyLines(lines);
                    break;
                case $list_removeDuplicates:
                    output = removeDuplicates(lines);
                    break;

                case $list_sort:
                    lines.sort(); // TODO: We may want to use ".toSorted()" when it becomes available in modern browsers (though performance-wise it may actually be disadvantageous).
                    output = lines;
                    break;
                case $list_caseInsensitiveSort:
                    lines.sort((a, b) => {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });
                    output = lines;
                    break;
                case $list_naturalSort:
                    lines.sort((a, b) => {
                        return a.localeCompare(b, undefined, { numeric: true });
                    });
                    output = lines;
                    break;
                case $list_randomize:
                    lines.sort(() => Math.random() - 0.5);
                    output = lines;
                    break;
                case $list_reverse:
                    lines.reverse();
                    output = lines;
                    break;

                case $list_trimLines:
                    output = trimLines(lines);
                    break;
                case $list_removeCommaCharacterAtLineEnds:
                    output = removeCommaCharacterAtEndFromLines(lines);
                    break;
                case $list_removeQuoteAndApostropheCharacters:
                    output = removeQuoteAndApostropheCharactersFromLines(lines);
                    break;

                case $list_linesToJsonArray:
                    output = JSON.stringify(lines, null, 4);
                    output = output.split('\n');
                    break;
            }

            const finalOutput = output.join('\n');
            return [null, finalOutput];
        } else {
            return [new Error(`Error: Implementation is not available for operation: ${operation}`)];
        }
    } catch (err) {
        return [err];
    }
};

export { performOperation };
