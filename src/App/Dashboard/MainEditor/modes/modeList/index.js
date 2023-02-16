/* eslint-disable filenames/no-index */

import { configListRemoveEmptyLines } from './configListRemoveEmptyLines.js';
import { configListRemoveDuplicates } from './configListRemoveDuplicates.js';

import { configListSort } from './configListSort.js';
import { configListSortCaseInsensitive } from './configListSortCaseInsensitive.js';
import { configListSortNatural } from './configListSortNatural.js';
import { configListRandomize } from './configListRandomize.js';
import { configListReverse } from './configListReverse.js';

import { configListTrimLines } from './configListTrimLines.js';
import { configListRemoveCommaCharacterAtLineEnds } from './configListRemoveCommaCharacterAtLineEnds.js';
import { configListRemoveQuoteAndApostropheCharacters } from './configListRemoveQuoteAndApostropheCharacters.js';

import { configListGetStats } from './configListGetStats.js';

import { configListLinesToJsonArray } from './configListLinesToJsonArray.js';

const modeList = {
    modeId: 'list',
    modeNameForAceEditor: 'text',

    title: 'List',

    icon: null,

    hasSyntaxHighlighting: false,

    snippets: [{
        content: [
            'Chelsea',
            'Bob',
            'Alice',
            'David'
        ].join('\n')
    }],

    operations: [
        {
            optgroupLabel: 'Lines',
            options: [
                configListRemoveEmptyLines, // Remove empty lines
                configListRemoveDuplicates  // Remove duplicates
                // Remove beyond N lines
            ]
        },
        {
            optgroupLabel: 'Sort',
            options: [
                configListSort,                // Sort
                configListSortCaseInsensitive, // Case-insensitive sort
                configListSortNatural,         // Natural sort
                configListRandomize,           // Randomize
                configListReverse              // Reverse
            ]
        },
        {
            optgroupLabel: 'String',
            options: [
                configListTrimLines,                         // Trim lines
                configListRemoveCommaCharacterAtLineEnds,    // Remove comma character at line ends
                configListRemoveQuoteAndApostropheCharacters // Remove " and ' characters
            ]
        },
        {
            optgroupLabel: 'Stats',
            options: [
                configListGetStats // Get statistics
                // Count lines        // Icon: FormatListNumberedRtlIcon
                // Count characters   // Icon: AbcIcon
                // Count words        // Icon: SubtitlesIcon
                // Count unique words // Icon: SubtitlesOutlinedIcon
            ]
        },
        {
            optgroupLabel: 'Convert',
            options: [
                configListLinesToJsonArray // Lines to JSON array
            ]
        }
    ]
};
modeList.arrOperations = modeList.operations.reduce((acc, curr) => {
    return acc.concat(curr.options);
}, []);
modeList.obOperations = modeList.arrOperations.reduce((acc, curr) => {
    acc[curr.operationId] = curr;
    return acc;
}, {});

export { modeList };
