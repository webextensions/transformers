import BuildIcon from '@mui/icons-material/Build.js';

import { fixDataTypes } from '../../textUtils.js';

const configJsonFixDataTypes = {
    operationId: 'jsonFixDataTypes',

    label: 'Fix data types',
    icon: BuildIcon,

    snippets: [{
        content: [
            '{',
            '	"profile": {',
            '		"name": "Alice",',
            '		"age": "20",',
            '		"height": "1.65",',
            '		"weight": "null",',
            '		"isStudent": "true"',
            '	}',
            '}'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        const output = fixDataTypes(inputJson);
        return [null, output];
    }
};

export { configJsonFixDataTypes };
