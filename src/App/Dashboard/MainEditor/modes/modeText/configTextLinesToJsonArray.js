import DataObjectIcon from '@mui/icons-material/DataObject.js';

const configTextLinesToJsonArray = {
    operationId: 'linesToJsonArray',

    label: 'Lines to JSON Array',
    icon: DataObjectIcon,

    snippets: [{
        content: [
            'Alice',
            'Bob',
            'Chelsea',
            'David'
        ].join('\n')
    }],

    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputText }) => {
        const outputArray = inputText.split('\n');
        return [null, outputArray];
    }
};

export { configTextLinesToJsonArray };
