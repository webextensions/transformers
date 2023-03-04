import FormatQuoteIcon from '@mui/icons-material/FormatQuote.js';

import { removeQuoteAndApostropheCharactersFromLines } from '../../textUtils.js';

const configTextRemoveQuoteAndApostropheCharacters = {
    operationId: 'textRemoveQuoteAndApostropheCharacters',

    label: 'Remove quote and apostrophe characters',
    icon: FormatQuoteIcon,

    snippets: [{
        content: [
            '"Alice",',
            '"Bob",',
            '"Chelsea",',
            '"David"'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = removeQuoteAndApostropheCharactersFromLines(inputArrayOfStrings);
        return [null, outputArrayOfStrings];
    }
};

export { configTextRemoveQuoteAndApostropheCharacters };
