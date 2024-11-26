import MoodIcon from '@mui/icons-material/Mood';

const configJsonFormat = {
    operationId: 'jsonFormat',

    label: 'Format JSON',
    icon: MoodIcon,

    snippets: [{
        content: [
            '{',
            '    "data": [',
            '        { "name": "Chelsea", "age": 22, "height": 1.85 },',
            '        { "name": "Bob",     "age": 21, "height": 1.75 },',
            '        { "name": "Alice",   "age": 20, "height": 1.65 },',
            '        { "name": "David",   "age": 23, "height": 1.95 }',
            '    ]',
            '}'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        const output = JSON.stringify(inputJson, null, '\t');
        return [null, output];
    }
};

export { configJsonFormat };
