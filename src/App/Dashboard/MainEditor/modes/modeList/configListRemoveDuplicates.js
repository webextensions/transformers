import CopyAllIcon from '@mui/icons-material/CopyAll.js';

import { removeDuplicates } from '../../textUtils.js';

const configListRemoveDuplicates = {
    operationId: 'listRemoveDuplicates',

    label: 'Remove duplicates',
    icon: CopyAllIcon,

    snippets: [{
        content: [
            'Chelsea',
            'Chelsea',
            'Bob',
            'Alice',
            'David',
            'Alice'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = removeDuplicates(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configListRemoveDuplicates };
