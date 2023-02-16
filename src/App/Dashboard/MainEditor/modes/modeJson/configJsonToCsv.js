import AppsIcon from '@mui/icons-material/Apps.js';

import { jsonToCsv } from '../../textUtils.js';

const configJsonToCsv = {
    operationId: 'jsonToCsv',

    label: 'JSON to CSV',
    icon: AppsIcon,

    snippets: [{
        content: [
            '[',
            '    { "name": "Chelsea", "age": 22, "height": 1.85 },',
            '    { "name": "Bob",     "age": 21, "height": 1.75 },',
            '    { "name": "Alice",   "age": 20, "height": 1.65 },',
            '    { "name": "David",   "age": 23, "height": 1.95 }',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        const output = jsonToCsv(inputJson);
        return [null, output];
    }
};

export { configJsonToCsv };
