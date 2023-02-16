import CommitIcon from '@mui/icons-material/Commit.js';

import { trimLines } from '../../textUtils.js';

const configListTrimLines = {
    operationId: 'listTrimLines',

    label: 'Trim lines',
    icon: CommitIcon,

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

export { configListTrimLines };
