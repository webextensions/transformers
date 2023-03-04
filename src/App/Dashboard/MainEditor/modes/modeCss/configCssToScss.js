import DataObjectIcon from '@mui/icons-material/DataObject.js';

import { lazyLoadCssToScss } from '../../../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

const configCssToScss = {
    operationId: 'cssToScss',

    label: 'CSS to SCSS',
    icon: DataObjectIcon,

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
        let output;
        if (inputText.trim() === '') {
            output = inputText;
        } else {
            const { cssToScss } = await lazyLoadCssToScss();
            output = cssToScss(inputText);

            // TODO: Identify and add note about in which case this might happen
            if (output === 'Error: no source supplied to csspretty.') {
                // eslint-disable-next-line no-alert
                alert('Sorry! The CSS to SCSS conversion failed.\n\nPlease try again with some simpler syntax.');
            }
        }
        return [null, output];
    }
};

export { configCssToScss };
