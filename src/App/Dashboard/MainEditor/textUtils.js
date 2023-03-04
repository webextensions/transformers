import jsonStableStringify from 'json-stable-stringify';

const removeEmptyLines = function (lines) {
    const output = lines.filter((x) => {
        return x;
    });
    return output;
};

const removeDuplicates = function (lines) {
    const output = [...new Set(lines)];
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
        return line.trimLeft();
    });
    return output;
};
const trimLinesRight = function (lines) {
    const output = lines.map((line) => {
        return line.trimRight();
    });
    return output;
};

const removeMatchingCharacterAtEndFromLine = function (line, char) {
    if (line[line.length - 1] === char) {
        return line.substring(0, line.length - 1);
    }
    return line;
};

const removeCommaCharacterAtEndFromLine = function (line) {
    return removeMatchingCharacterAtEndFromLine(line, ',');
};

const removeCommaCharacterAtEndFromLines = function (lines) {
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
    const output = lines.map(removeQuoteAndApostropheCharactersFromLine);
    return output;
};

const removeLastColumnFromCsvLine = (line) => {
    const columns = line.split(',');
    columns.pop();
    return columns.join(',');
};
const removeLastColumnFromCsvLines = function (lines) {
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
    const output = lines.map(removeFirstColumnFromCsvLine);
    return output;
};

const csvToJson = function (lines) {
    const output = ['['];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split(',');
        const obj = {};

        // eslint-disable-next-line unicorn/no-for-loop
        for (let j = 0; j < columns.length; j++) {
            const column = columns[j];
            const header = headers[j];
            obj[header] = column;
        }
        if (i < lines.length - 1) {
            output.push('\t' + JSON.stringify(obj) + ',');
        } else {
            output.push('\t' + JSON.stringify(obj));
        }
    }
    output.push(']');
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
            node = node.map(item => {
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

const jsonToCsv = function (json) {
    const line = [];
    const output = [];

    const keys = Object.keys(json[0]);
    for (const key of keys) {
        line.push(key);
    }
    output.push(line.join(','));

    for (const ob of json) {
        const line = [];
        for (const key of keys) {
            line.push(ob[key]);
        }
        output.push(line.join(','));
    }

    return output.join('\n');
};

export {
    removeEmptyLines,
    removeDuplicates,

    trimLines,
    trimLinesLeft,
    trimLinesRight,
    removeCommaCharacterAtEndFromLines,
    removeQuoteAndApostropheCharactersFromLines,

    removeFirstColumnFromCsvLines,
    removeLastColumnFromCsvLines,

    csvToJson,

    fixDataTypes,
    jsonStableStringify,
    jsonToCsv
};
