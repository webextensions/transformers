import LastPageIcon from '@mui/icons-material/LastPage.js';

import { removeLastColumnFromCsvLines } from '../../textUtils.js';

const configCsvRemoveLastColumn = {
    operationId: 'csvRemoveLastColumn',

    label: 'Remove last column',
    icon: LastPageIcon,

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputText = removeLastColumnFromCsvLines(inputArrayOfStrings);
        return [null, outputText];
    }
};

export { configCsvRemoveLastColumn };
