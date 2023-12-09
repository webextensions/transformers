/* eslint-disable @stylistic/no-tabs */

import SwapVertIcon from '@mui/icons-material/SwapVert.js';

const configJsonArrayReverse = {
    operationId: 'jsonArrayReverse',

    label: 'Reverse',
    icon: SwapVertIcon,

    snippets: [{
        content: [
            '[',
            '	{',
            '		"name": "Alice",',
            '		"age": 20',
            '	},',
            '	{',
            '		"name": "Bob",',
            '		"age": 21',
            '	},',
            '	{',
            '		"name": "Chelsea",',
            '		"age": 22',
            '	},',
            '	{',
            '		"name": "David",',
            '		"age": 23',
            '	}',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        if (!Array.isArray(inputJson)) {
            return [new Error('Please provide an array as the input.')];
        }

        const output = inputJson;
        output.reverse();
        return [null, output];
    }
};

export { configJsonArrayReverse };
