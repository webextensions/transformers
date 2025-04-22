// Ref: https://github.com/mathiasbynens/punycode.js/blob/9e1b2cda98d215d3a73fcbfe93c62e021f4ba768/README.md?plain=1#L29
// * We are importing from 'punycode/' (notice the trailing slash) to avoid importing the native punycode module (which
//   has been deprecated)
// * Consider migrating to 'punycode.js' (https://www.npmjs.com/package/punycode.js /
//   https://github.com/mathiasbynens/punycode.js/) which is actually the same project but with a non-conflicting name
import {
    toASCII as unicodeToPunycode,
    toUnicode as punycodeToUnicode
} from 'punycode/';

import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';

const configUnicodeToPunycode = {
    operationId: 'unicodeToPunycode',

    label: 'Unicode to Punycode',
    icon: TranslateIcon,

    snippets: [{
        content: [
            'i❤.ws',
            'i❤tacos.ws',
            'münchen.de',
            '👓.ws',
            'café.example.com'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        try {
            const outputArrayOfStrings = inputArrayOfStrings.map((line) => {
                return unicodeToPunycode(line);
            });
            return [null, outputArrayOfStrings];
        } catch (err) {
            console.error(err);
            return [new Error('Failed to convert from Unicode to Punycode!')];
        }
    }
};

const configPunycodeToUnicode = {
    operationId: 'punycodeToUnicode',

    label: 'Punycode to Unicode',
    icon: LanguageIcon,

    snippets: [{
        content: [
            'xn--i-7iq.ws',           // i❤.ws
            'xn--itacos-i50d.ws',     // i❤tacos.ws
            'xn--mnchen-3ya.de',      // münchen.de
            'xn--4p8h.ws',            // 👓.ws
            'xn--caf-dma.example.com' // café.example.com
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        try {
            const outputArrayOfStrings = inputArrayOfStrings.map((line) => {
                return punycodeToUnicode(line);
            });
            return [null, outputArrayOfStrings];
        } catch (err) {
            console.error(err);
            return [new Error('Failed to convert from Punycode to Unicode!')];
        }
    }
};

export {
    configUnicodeToPunycode,
    configPunycodeToUnicode
};
