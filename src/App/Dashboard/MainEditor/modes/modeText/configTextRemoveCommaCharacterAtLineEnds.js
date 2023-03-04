import CleaningServicesIcon from '@mui/icons-material/CleaningServices.js';

import { removeCommaCharacterAtEndFromLines } from '../../textUtils.js';

const configTextRemoveCommaCharacterAtLineEnds = {
    operationId: 'textRemoveCommaCharacterAtLineEnds',

    label: 'Remove comma character at line ends',
    icon: CleaningServicesIcon,

    snippets: [{
        content: [
            'Alice,',
            'Bob,',
            'Chelsea,',
            'David'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = removeCommaCharacterAtEndFromLines(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextRemoveCommaCharacterAtLineEnds };
