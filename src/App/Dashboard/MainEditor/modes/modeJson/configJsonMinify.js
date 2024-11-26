import CompressIcon from '@mui/icons-material/Compress';

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
