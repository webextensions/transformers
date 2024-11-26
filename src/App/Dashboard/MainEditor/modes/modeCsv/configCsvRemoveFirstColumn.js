import FirstPageIcon from '@mui/icons-material/FirstPage';

import { removeFirstColumnFromCsvLines } from '../../textUtils.js';

const configCsvRemoveFirstColumn = {
    operationId: 'csvRemoveFirstColumn',

    label: 'Remove first column',
    icon: FirstPageIcon,

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputText = removeFirstColumnFromCsvLines(inputArrayOfStrings);
        return [null, outputText];
    }
};

export { configCsvRemoveFirstColumn };
