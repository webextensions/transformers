import BackspaceIcon from '@mui/icons-material/Backspace';

const configTextRemoveLastFewCharacters = {
    operationId: 'textRemoveLastFewCharacters',

    label: 'Remove last few characters',
    icon: BackspaceIcon,

    snippets: [{
        content: [
            '1234567890-12345-54321-0987654321',
            '1234567890             0987654321',
            '           12345-54321',
            '           abcde-edcba',
            'abcdefghij             jihgfedcba',
            'abcdefghij-abcde-edcba-jihgfedcba',
            '',
            '+1-1234567890',
            '+1-9876543210',
            '',
            '123,000,000',
            '987,000,000',
            '000,000,123',
            '000,000,987',
            '',
            'Mr. Smith',
            'Ms. Smith',
            'Mrs. Smith'
        ].join('\n')
    }],

    operationInputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'array-of-strings', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputArrayOfStrings }) => {
        // eslint-disable-next-line no-alert
        const numberOfCharsToRemove = prompt('Please enter the number of characters to remove from the end of each line:');

        if (numberOfCharsToRemove === null) {
            return [new Error('Please provide the number of characters to remove.')];
        }

        const n = Number.parseInt(numberOfCharsToRemove, 10);

        if (Number.isNaN(n)) {
            return [new Error('Please provide a valid number')];
        } else if (!(n >= 1)) { // Deliberately utilizing "!(n >= 1)" (rather than "n <= 0") since this condition would work better if isNaN based check wasn't used
            return [new Error('Please provide a number >= 1')];
        }

        const outputArrayOfStrings = inputArrayOfStrings.map((line) => {
            if (line.length <= n) {
                return '';
            }
            return line.slice(0, -n);
        });

        return [null, outputArrayOfStrings];
    }
};

export { configTextRemoveLastFewCharacters };
