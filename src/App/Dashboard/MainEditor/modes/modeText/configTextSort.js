import SortIcon from '@mui/icons-material/Sort';

const configTextSort = {
    operationId: 'textSort',

    label: 'Sort',
    icon: SortIcon,

    snippets: [{
        content: [
            'Chelsea',
            'Bob',
            'Alice',
            'David'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = inputArrayOfStrings;
        outputArrayOfStrings.sort();
        return [null, outputArrayOfStrings];
    }
};

export { configTextSort };
