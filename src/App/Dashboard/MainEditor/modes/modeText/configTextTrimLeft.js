import ArrowBackIcon from '@mui/icons-material/ArrowBack.js';

import { trimLinesLeft } from '../../textUtils.js';

const configTextTrimLeft = {
    operationId: 'textTrimLeft',

    label: 'Trim lines from left',
    icon: ArrowBackIcon,

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
        const outputArrayOfStrings = trimLinesLeft(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextTrimLeft };
