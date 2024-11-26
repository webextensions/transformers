import CopyAllIcon from '@mui/icons-material/CopyAll';

import { removeDuplicates } from '../../textUtils.js';

const configTextRemoveDuplicates = {
    operationId: 'textRemoveDuplicates',

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

export { configTextRemoveDuplicates };
