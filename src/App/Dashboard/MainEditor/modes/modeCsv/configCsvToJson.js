import DataObjectIcon from '@mui/icons-material/DataObject';

import { csvToJson } from '../../textUtils.js';

const configCsvToJson = {
    operationId: 'csvToJson',

    label: 'CSV to JSON',
    icon: DataObjectIcon,

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputText = csvToJson(inputArrayOfStrings);
        return [null, outputText];
    }
};

export { configCsvToJson };
