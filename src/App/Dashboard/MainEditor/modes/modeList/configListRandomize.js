import ShuffleOnIcon from '@mui/icons-material/ShuffleOn.js';

const configListRandomize = {
    operationId: 'listRandomize',

    label: 'Randomize',
    icon: ShuffleOnIcon,

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
        outputArrayOfStrings.sort(() => Math.random() - 0.5);
        return [null, outputArrayOfStrings];
    }
};

export { configListRandomize };
