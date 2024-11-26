import TextRotationAngledownIcon from '@mui/icons-material/TextRotationAngledown';

const configTextSortByLength = {
    operationId: 'textSortByLength',

    label: 'Sort by length',
    icon: TextRotationAngledownIcon,

    snippets: [{
        content: [
            'David',
            'Bob',
            'Chelsea',
            'Alice'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = inputArrayOfStrings;

        // Sort by string length
        outputArrayOfStrings.sort((a, b) => {
            if (a.length === b.length) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                return a.length - b.length;
            }
        });

        return [null, outputArrayOfStrings];
    }
};

export { configTextSortByLength };
