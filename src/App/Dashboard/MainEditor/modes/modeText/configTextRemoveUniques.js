import RemoveIcon from '@mui/icons-material/Remove';

import { removeUniques } from '../../textUtils.js';

const configTextRemoveUniques = {
    operationId: 'textRemoveUniques',

    label: 'Remove uniques',
    icon: RemoveIcon,

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
        const outputArrayOfStrings = removeUniques(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextRemoveUniques };
