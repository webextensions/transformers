import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet.js';

import { removeEmptyLines } from '../../textUtils.js';

const configListRemoveEmptyLines = {
    operationId: 'listRemoveEmptyLines',

    label: 'Remove empty lines',
    icon: SettingsEthernetIcon,

    snippets: [{
        content: [
            'Chelsea',
            '',
            'Bob',
            '',
            'Alice',
            '',
            'David'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = removeEmptyLines(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configListRemoveEmptyLines };
