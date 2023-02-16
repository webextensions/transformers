import CompressIcon from '@mui/icons-material/Compress.js';

const configJsonMinify = {
    operationId: 'jsonMinify',

    label: 'Minify JSON',
    icon: CompressIcon,

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        const output = JSON.stringify(inputJson);
        return [null, output];
    }
};

export { configJsonMinify };
