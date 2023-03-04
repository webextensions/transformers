import CompressIcon from '@mui/icons-material/Compress.js';

import { lazyLoadMinifyCss } from '../../../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

const configCssMinify = {
    operationId: 'cssMinify',

    label: 'Minify CSS',
    icon: CompressIcon,

    snippets: [{
        content: [
            'body {',
            '    background-color: #f0f0f0;',
            '}',
            '',
            'body h1 {',
            '    color: #000000;',
            '}'
        ].join('\n')
    }],

    performOperation: async ({ inputText }) => {
        const { minifyCss } = await lazyLoadMinifyCss();
        const output = minifyCss(inputText);
        return [null, output];
    }
};

export { configCssMinify };
