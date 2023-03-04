import MoodIcon from '@mui/icons-material/Mood.js';

import { lazyLoadBeautifyCss } from '../../../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

const configCssFormat = {
    operationId: 'cssFormat',

    label: 'Format CSS',
    icon: MoodIcon,

    snippets: [{
        content: [
            'body {background-color:#f0f0f0;}',
            '',
            'body h1 {color:#000000;}'
        ].join('\n')
    }],

    performOperation: async ({ inputText }) => {
        const { beautifyCss } = await lazyLoadBeautifyCss();
        const output = beautifyCss(inputText);
        return [null, output];
    },

    extras: [
        /*
        // // Have a look at:
        // //     * https://www.npmjs.com/package/@rjsf/core
        // //     * https://www.npmjs.com/package/react-hook-form
        //
        // customizations: [
        //     {
        //         label: 'Indent Type',
        //         type: 'select',
        //         children: [
        //             {
        //                 type: 'checkbox',
        //                 label: 'Try detecting first',
        //                 value: 'detect'
        //             },
        //             {
        //                 type: 'radio',
        //                 defaultOption: 'space',
        //                 options: [
        //                     {
        //                         label: 'Space',
        //                         value: 'space',
        //                         children: [
        //                             {
        //                                 label: 'Indent Size',
        //                                 type: 'number',
        //                                 defaultValue: 4,
        //                                 min: 1,
        //                                 max: 10,
        //                                 step: 1
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         label: 'Tab',
        //                         value: 'tab'
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ]
        */
    ]
};

export { configCssFormat };
