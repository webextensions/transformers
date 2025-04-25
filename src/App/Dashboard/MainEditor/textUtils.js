import { json2csv, csv2json } from 'json-2-csv';

const removeEmptyLines = function (lines) {
    const output = lines.filter(Boolean);
    return output;
};

const removeDuplicates = function (lines) {
    const output = [...new Set(lines)];
    return output;
};

const removeUniques = function (lines) {
    const counts = {};
    for (const line of lines) {
        counts[line] = counts[line] || 0;
        counts[line]++;
    }

    const output = [];
    for (const line in counts) {
        if (counts[line] > 1) {
            output.push(line);
        }
    }

    return output;
};

const trimLines = function (lines) {
    const output = lines.map((line) => {
        return line.trim();
    });
    return output;
};
const trimLinesLeft = function (lines) {
    const output = lines.map((line) => {
        return line.trimStart();
    });
    return output;
};
const trimLinesRight = function (lines) {
    const output = lines.map((line) => {
        return line.trimEnd();
    });
    return output;
};

const removeMatchingCharacterAtEndFromLine = function (line, char) {
    if (line.at(-1) === char) {
        // return line.substring(0, line.length - 1);
        return line.slice(0, Math.max(0, line.length - 1));
    }
    return line;
};

const removeCommaCharacterAtEndFromLine = function (line) {
    return removeMatchingCharacterAtEndFromLine(line, ',');
};

const removeCommaCharacterAtEndFromLines = function (lines) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const output = lines.map(removeCommaCharacterAtEndFromLine);
    return output;
};

const removeQuoteAndApostropheCharactersFromLine = function (line) {
    return (
        line
            .replaceAll('"', '')
            .replaceAll("'", '')
    );
};
const removeQuoteAndApostropheCharactersFromLines = function (lines) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const output = lines.map(removeQuoteAndApostropheCharactersFromLine);
    return output;
};

const removeLastColumnFromCsvLine = (line) => {
    const columns = line.split(',');
    columns.pop();
    return columns.join(',');
};
const removeLastColumnFromCsvLines = function (lines) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const output = lines.map(removeLastColumnFromCsvLine);
    return output;
};

const removeFirstColumnFromCsvLine = (line) => {
    const columns = line.split(',');
    columns.shift();
    const output = columns.join(',');
    return output;
};
const removeFirstColumnFromCsvLines = function (lines) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const output = lines.map(removeFirstColumnFromCsvLine);
    return output;
};

const csvToJson = function (lines) {
    const arrJson = csv2json(lines.join('\n'));

    let output = ['['];
    for (const [index, obj] of arrJson.entries()) {
        output.push('\t' + JSON.stringify(obj) + (index === arrJson.length - 1 ? '' : ','));
    }
    output.push(']');

    output = output.join('\n');

    return output;
};

const traverseNode = function (root, transform) {
    const output = transform(root);

    if (typeof output === 'object') {
        for (const key in output) {
            output[key] = traverseNode(output[key], transform);
        }
    }

    return output;
};

const fixDataTypes = function (json) {
    const output = traverseNode(json, function (node) {
        if (typeof node === 'string') {
            if (node === 'true') {
                node = true;
            } else if (node === 'false') {
                node = false;
            } else if (node === 'null') {
                node = null;
            } else if (String(Number(node)) === node) {
                if (
                    String(Number(node)) === 'Infinity' ||
                    String(Number(node)) === '-Infinity' ||
                    String(Number(node)) === 'NaN'
                ) {
                    // Do nothing
                } else {
                    node = Number(node);
                }
            }
        } else if (Array.isArray(node)) {
            node = node.map((item) => {
                return fixDataTypes(item);
            });
        } else if (typeof node === 'object') {
            for (const key in node) {
                node[key] = fixDataTypes(node[key]);
            }
        }

        return node;
    });

    return output;
};

const jsonToCsv = async function (json) {
    const csv = await json2csv(json);
    return csv;
};

export { default as jsonStableStringify } from 'json-stable-stringify';

export {
    removeEmptyLines,
    removeDuplicates,
    removeUniques,

    trimLines,
    trimLinesLeft,
    trimLinesRight,
    removeCommaCharacterAtEndFromLines,
    removeQuoteAndApostropheCharactersFromLines,

    removeFirstColumnFromCsvLines,
    removeLastColumnFromCsvLines,

    csvToJson,

    fixDataTypes,
    jsonToCsv
};
