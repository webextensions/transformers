import ArrowForwardIcon from '@mui/icons-material/ArrowForward.js';

import { trimLinesRight } from '../../textUtils.js';

const configTextTrimRight = {
    operationId: 'textTrimRight',

    label: 'Trim lines from right',
    icon: ArrowForwardIcon,

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
        const outputArrayOfStrings = trimLinesRight(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextTrimRight };
