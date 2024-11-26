import AppsIcon from '@mui/icons-material/Apps';

import { jsonToCsv } from '../../textUtils.js';

const configJsonToCsv = {
    operationId: 'jsonToCsv',

    label: 'JSON to CSV',
    icon: AppsIcon,

    snippets: [{
        content: [
            '[',
            '    { "name": "Chelsea", "age": 22, "height": 1.85, "course": { "field": "Engineering" } },',
            '    { "name": "Bob",     "age": 21, "height": 1.75, "course": { "field": "Medical"     } },',
            '    { "name": "Alice",   "age": 20, "height": 1.65, "course": { "field": "Engineering" } },',
            '    { "name": "David",   "age": 23, "height": 1.95, "course": { "field": "Medical"     } }',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: async ({ inputJson }) => {
        const output = await jsonToCsv(inputJson);
        return [null, output];
    }
};

export { configJsonToCsv };
