import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown.js';

const configTextReverse = {
    operationId: 'textReverse',

    label: 'Reverse',
    icon: KeyboardDoubleArrowDownIcon,

    snippets: [{
        content: [
            'Alice',
            'Bob',
            'Chelsea',
            'David'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = inputArrayOfStrings;
        outputArrayOfStrings.reverse();
        return [null, outputArrayOfStrings];
    }
};

export { configTextReverse };
