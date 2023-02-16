/* eslint-disable filenames/no-index */

import { configJsonFormat } from './configJsonFormat.js';
import { configJsonMinify } from './configJsonMinify.js';

import { configJsonSort } from './configJsonSort.js';

import { configJsonRemoveProperty } from './configJsonRemoveProperty.js';

import { configJsonArrayReverse } from './configJsonArrayReverse.js';

import { configJsonArrayOfObjectsFlattenObjects } from './configJsonArrayOfObjectsFlattenObjects.js';
import { configJsonArrayOfObjectsSortByProperty } from './configJsonArrayOfObjectsSortByProperty.js';

import { configJsonFixDataTypes } from './configJsonFixDataTypes.js';

import { configJsonToCsv } from './configJsonToCsv.js';
import { configJsonToLines } from './configJsonToLines.js';

const modeJson = {
    modeId: 'json',
    modeNameForAceEditor: 'json',

    title: 'JSON',

    icon: null,

    hasSyntaxHighlighting: true,

    snippets: [{
        content: [
            '{',
            '    "data": [',
            '        { "name": "Chelsea", "age": 22, "height": 1.85 },',
            '        { "name": "Bob",     "age": 21, "height": 1.75 },',
            '        { "name": "Alice",   "age": 20, "height": 1.65 },',
            '        { "name": "David",   "age": 23, "height": 1.95 }',
            '    ]',
            '}'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Format',
            options: [
                configJsonFormat,
                configJsonMinify
            ]
        },
        {
            optgroupLabel: 'Sort',
            options: [
                configJsonSort
            ]
        },
        {
            optgroupLabel: 'Edit',
            options: [
                configJsonRemoveProperty
            ]
        },
        {
            optgroupLabel: 'Array',
            options: [
                configJsonArrayReverse
            ]
        },
        {
            optgroupLabel: 'Array of objects',
            options: [
                configJsonArrayOfObjectsFlattenObjects,
                configJsonArrayOfObjectsSortByProperty
            ]
        },
        {
            optgroupLabel: 'Fix',
            options: [
                configJsonFixDataTypes
            ]
        },
        {
            optgroupLabel: 'Convert',
            options: [
                configJsonToCsv,
                configJsonToLines
            ]
        }
    ]
};
modeJson.arrOperations = modeJson.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
modeJson.obOperations = modeJson.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeJson };
