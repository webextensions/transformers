import {
    beautifyCss,
    cssToScss,
    minifyCss
} from 'helpmate-css/dist/index.js';

import './before-loading-less.js';

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
    $css_toScss,

    $css_format,
    $css_minify,

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

    $csv_removeFirstColumnFromCsv,
    $csv_removeLastColumnFromCsv,

    $csv_toJson,

    $json_format,
    $json_minify,

    $json_removeProperty,

    $json_sort,

    $json_fixDataTypes,

    $json_toLines,
    $json_toCsv,

    $less_format,
    $less_minify,

    $less_toCss
} from './constOperations.js';

const lazyLoadLess = async () => {
    const less = await import('less');
    return less;
};

const performOperation = async function ({ getInputValue, operation }) {
    try {
        if (
            [
                $css_format,
                $css_minify,
                $css_toScss,
                $less_format,
                $less_minify,
                $less_toCss
            ].includes(operation)
        ) {
            const input = getInputValue();
            let output;
            let err = null;
            const extraInfo = {};

            switch (operation) {
                case $css_format:
                    output = beautifyCss(input);
                    break;
                case $css_minify:
                    output = minifyCss(input);
                    break;
                case $css_toScss:
                    if (input.trim() === '') {
                        output = input;
                    } else {
                        output = cssToScss(input);

                        // TODO: Identify and add note about in which case this might happen
                        if (output === 'Error: no source supplied to csspretty.') {
                            // eslint-disable-next-line no-alert
                            alert('Sorry! The CSS to SCSS conversion failed.\n\nPlease try again with some simpler syntax.');
                        }
                    }
                    break;
                case $less_format:
                    output = beautifyCss(input);
                    break;
                case $less_minify:
                    output = minifyCss(input);
                    break;

                case $less_toCss:
                    if (input.trim() === '') {
                        output = input;
                    } else {
                        try {
                            const less = await lazyLoadLess();

                            const renderedOutput = await less.render(input);
                            output = renderedOutput.css;

                            // By default, "less.render()" provides the output with indentation of 2 space characters
                            output = beautifyCss(output);
                        } catch (e) {
                            err = new Error(e.message + `\n(Line ${e.line}, Column ${e.column}) / (Character ${e.index})`);
                            output = null;

                            const moveCursorTo = {
                                row: e.line - 1,
                                column: e.column,

                                position: e.index
                            };
                            extraInfo.moveCursorTo = moveCursorTo;
                        }
                    }
                    break;
            }

            return [err, output, extraInfo];
        } else if (
            [
                $json_format,
                $json_minify,
                $json_removeProperty,
                $json_sort,
                $json_fixDataTypes,
                $json_toLines,
                $json_toCsv
            ].includes(operation)
        ) {
            const input = getInputValue();
            const jsonInput = JSON.parse(input);
            let output;

            switch (operation) {
                case $json_format:
                    output = JSON.stringify(jsonInput, null, '\t');
                    break;
                case $json_minify:
                    output = JSON.stringify(jsonInput);
                    break;
                case $json_removeProperty:
                    // Just a block
                    {
                        // Remove a property from a JSON object recursively
                        // TODO: Optimize this function
                        // TODO: Verify that this function works as expected for all cases
                        const removePropertyRecursively = (obj, propertyName) => {
                            // eslint-disable-next-line no-prototype-builtins
                            if (obj.hasOwnProperty(propertyName)) {
                                delete obj[propertyName];
                            } else {
                                Object.keys(obj).forEach(key => {
                                    if (typeof obj[key] === 'object') {
                                        removePropertyRecursively(obj[key], propertyName);
                                    } else if (Array.isArray(obj[key])) {
                                        obj[key].forEach(item => {
                                            if (typeof item === 'object') {
                                                removePropertyRecursively(item, propertyName);
                                            } else {
                                                // Do nothing
                                            }
                                        });
                                    } else {
                                        // Do nothing
                                    }
                                });
                            }
                        };

                        // eslint-disable-next-line no-alert
                        const propertyName = prompt('Please enter the name of the property to remove:');
                        if (propertyName) {
                            removePropertyRecursively(jsonInput, propertyName);
                            output = JSON.stringify(jsonInput, null, '\t');
                        } else {
                            return [new Error('Please provide a property name.')];
                        }
                    }
                    break;
                case $json_sort:
                    output = jsonStableStringify(jsonInput, { space: '\t' });
                    break;
                case $json_fixDataTypes:
                    output = fixDataTypes(jsonInput);
                    output = JSON.stringify(output, null, '\t');
                    break;
                case $json_toLines:
                    if (
                        Array.isArray(jsonInput) &&
                        jsonInput.every(item => typeof item === 'string')
                    ) {
                        output = jsonInput.join('\n');
                    } else {
                        return [new Error('Please provide an Array of Strings as the input.')];
                    }
                    break;
                case $json_toCsv:
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
                $csv_removeFirstColumnFromCsv,
                $csv_removeLastColumnFromCsv,

                $csv_toJson,

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
                case $csv_removeFirstColumnFromCsv:
                    output = removeFirstColumnFromCsvLines(lines);
                    break;
                case $csv_removeLastColumnFromCsv:
                    output = removeLastColumnFromCsvLines(lines);
                    break;

                case $csv_toJson:
                    output = csvToJson(lines);
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
                    output = JSON.stringify(lines, null, '\t');
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
