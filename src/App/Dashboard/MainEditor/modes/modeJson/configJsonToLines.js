import ReorderIcon from '@mui/icons-material/Reorder';

const configJsonToLines = {
    operationId: 'jsonToLines',

    label: 'JSON to Lines',
    icon: ReorderIcon,

    snippets: [{
        content: [
            '[',
            '    "Alice",',
            '    "Bob",',
            '    "Chelsea",',
            '    "David"',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        if (
            Array.isArray(inputJson) &&
            inputJson.every((item) => typeof item === 'string')
        ) {
            const output = inputJson.join('\n');
            return [null, output];
        } else {
            return [new Error('Please provide an Array of Strings as the input.')];
        }
    }
};

export { configJsonToLines };
