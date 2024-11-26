import MultipleStopIcon from '@mui/icons-material/MultipleStop';

import { trimLines } from '../../textUtils.js';

const configTextTrim = {
    operationId: 'textTrim',

    label: 'Trim lines',
    icon: MultipleStopIcon,

    snippets: [{
        content: [
            ' Alice ',
            '    Bob  ',
            'Chelsea    ',
            '   David'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = trimLines(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextTrim };
