import MoodIcon from '@mui/icons-material/Mood';

import { lazyLoadBeautifyCss } from '../../../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

const configLessFormat = {
    operationId: 'lessFormat',

    label: 'Format LESS',
    icon: MoodIcon,

    snippets: [{
        content: [
            '@color: #444;',
            '@headingSize: 24px;',
            '',
            'body {',
            '    color: @color;',
            '',
            '    a { color: @color; }',
            '',
            '    h1 { font-size: @headingSize; }',
            '}'
        ].join('\n')
    }],

    performOperation: async ({ inputText }) => {
        const { beautifyCss } = await lazyLoadBeautifyCss();

        const output = beautifyCss(inputText);
        return [null, output];
    }
};

export { configLessFormat };
