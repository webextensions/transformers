import DataObjectIcon from '@mui/icons-material/DataObject.js';

import { beautifyCss } from 'helpmate-css/dist/index.js';

import './before-loading-less.js';

const lazyLoadLess = async () => {
    const less = await import('less');
    return less;
};

const configLessToCss = {
    operationId: 'lessToCss',

    label: 'LESS to CSS',
    icon: DataObjectIcon,

    snippets: [{
        content: [
            '@color: #444;',
            '@headingSize: 24px;',
            '',
            'body {',
            '    color: @color;',
            '',
            '    a {',
            '        color: @color;',
            '    }',
            '',
            '    h1 {',
            '        font-size: @headingSize;',
            '    }',
            '}'
        ].join('\n')
    }],

    performOperation: async ({ inputText }) => {
        let err = null;
        let output;
        const extraInfo = {};

        if (inputText.trim() === '') {
            output = inputText;
        } else {
            try {
                const less = await lazyLoadLess();

                const renderedOutput = await less.render(inputText);
                output = renderedOutput.css;

                // By default, "less.render()" provides the output with indentation of 2 space characters
                output = beautifyCss(output);
            } catch (e) {
                err = new Error(e.message + `\n(Line ${e.line}, Column ${e.column}) / (Character ${e.index})`);
                output = null;

                const moveCursorTo = {
                    row: e.line - 1,
                    column: e.column,

                    position: e.index
                };
                extraInfo.moveCursorTo = moveCursorTo;
            }
        }

        return [err, output, extraInfo];
    }
};

export { configLessToCss };
