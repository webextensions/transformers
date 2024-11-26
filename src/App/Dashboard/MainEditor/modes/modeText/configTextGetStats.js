import BarChartIcon from '@mui/icons-material/BarChart';

const configTextGetStats = {
    operationId: 'textGetStats',

    label: 'Get stats',
    icon: BarChartIcon,

    snippets: [{
        content: [
            'The quick brown fox jumps over the lazy dog.',
            '',
            'Sphinx of black quartz, judge my vow.',
            '',
            'Mr Jock, TV quiz PhD, bags few lynx.',
            '',
            'Cwm fjord bank glyphs vext quiz.'
        ].join('\n')
    }],

    performOperation: ({ inputText }) => {
        const stats = {};

        const input = inputText;
        const lines = input.split('\n');
        stats.linesCount = lines.length;
        stats.charactersCount = input.length;

        // Replace all punctuation characters with a single space
        const inputWithoutPunctuation = input.replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' '); // eslint-disable-line no-useless-escape

        // Replace all continuous whitespace characters with a single space
        const inputWithoutWhitespace = inputWithoutPunctuation.replaceAll(/\s+/g, ' ');

        const words = inputWithoutWhitespace.split(' ').filter((word) => word !== '');
        stats.wordsCount = words.length; // Not a perfect way to count words, but it's good enough for now.

        const lowerCaseWords = words.map((word) => word.toLowerCase());
        stats.uniqueWordsCount = (new Set(lowerCaseWords)).size;

        // eslint-disable-next-line no-alert
        alert(JSON.stringify(stats, null, '    '));

        return [null, null, { stats }];
    }
};

export { configTextGetStats };
