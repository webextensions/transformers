import AbcIcon from '@mui/icons-material/Abc';

const configTextSortCaseInsensitive = {
    operationId: 'textSortCaseInsensitive',

    label: 'Case-insensitive sort',
    icon: AbcIcon,

    snippets: [{
        content: [
            'Chelsea',
            'dave',
            'Bob',
            'Alice',
            'David',
            'angel',
            'alice'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = inputArrayOfStrings;
        outputArrayOfStrings.sort((a, b) => {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        return [null, outputArrayOfStrings];
    }
};

export { configTextSortCaseInsensitive };
