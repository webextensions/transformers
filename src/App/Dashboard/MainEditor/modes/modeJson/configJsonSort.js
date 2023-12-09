/* eslint-disable @stylistic/no-tabs */

import CategoryIcon from '@mui/icons-material/Category.js';

import { jsonStableStringify } from '../../textUtils.js';

const configJsonSort = {
    operationId: 'jsonSort',

    label: 'Sort JSON',
    icon: CategoryIcon,

    snippets: [{
        content: [
            '[',
            '	{',
            '		"name": "Chelsea",',
            '		"age": 22,',
            '		"height": 1.85',
            '	},',
            '	{',
            '		"name": "Bob",',
            '		"age": 21,',
            '		"height": 1.75',
            '	}',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        const output = jsonStableStringify(inputJson, { space: '\t' });
        return [null, output];
    }
};

export { configJsonSort };
