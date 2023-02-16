/* eslint-disable filenames/no-index */

import { configCsvRemoveFirstColumn } from './configCsvRemoveFirstColumn.js';
import { configCsvRemoveLastColumn } from './configCsvRemoveLastColumn.js';

import { configCsvToJson } from './configCsvToJson.js';

const modeCsv = {
    modeId: 'csv',
    modeNameForAceEditor: 'csv',

    title: 'CSV',

    icon: null,

    hasSyntaxHighlighting: true,

    snippets: [{
        content: [
            'Name,Age,Height',
            'Chelsea,22,1.85',
            'Bob,21,1.75',
            'Alice,20,1.65',
            'David,23,1.95'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Columns',
            options: [
                configCsvRemoveFirstColumn, // Remove first column from CSV
                configCsvRemoveLastColumn   // Remove last column from CSV
            ]
        },
        {
            optgroupLabel: 'Convert',
            options: [
                configCsvToJson             // CSV to JSON
            ]
        }
    ]
};
modeCsv.arrOperations = modeCsv.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
modeCsv.obOperations = modeCsv.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeCsv };
