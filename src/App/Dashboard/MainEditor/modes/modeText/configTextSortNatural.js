import ParkIcon from '@mui/icons-material/Park';

const configTextSortNatural = {
    operationId: 'textSortNatural',

    label: 'Natural sort',
    icon: ParkIcon,

    snippets: [{
        content: [
            '12 apples',
            '10 bananas',
            '7 cherries',
            '5 dates'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        const outputArrayOfStrings = inputArrayOfStrings;
        outputArrayOfStrings.sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true });
        });
        return [null, outputArrayOfStrings];
    }
};

export { configTextSortNatural };
