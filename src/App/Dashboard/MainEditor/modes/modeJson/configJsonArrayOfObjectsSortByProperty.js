/* eslint-disable @stylistic/no-tabs */

import CategoryIcon from '@mui/icons-material/Category';

const configJsonArrayOfObjectsSortByProperty = {
    operationId: 'jsonArrayOfObjectsSortByProperty',

    label: 'Sort by property',
    icon: CategoryIcon,

    snippets: [{
        content: [
            '[',
            '	{',
            '		"name": "Chelsea",',
            '		"rank": 2',
            '	},',
            '	{',
            '		"name": "Bob",',
            '		"rank": 3',
            '	},',
            '	{',
            '		"name": "Alice",',
            '		"rank": 4',
            '	},',
            '	{',
            '		"name": "David",',
            '		"rank": 1',
            '	}',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        let output;

        // Sort an array of objects by a property
        // eslint-disable-next-line no-alert
        const propertyName = prompt('Please enter the name of the property to be sorted by:');
        if (propertyName) {
            output = inputJson;
            output.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) {
                    return -1;
                }
                if (a[propertyName] > b[propertyName]) {
                    return 1;
                }
                return 0;
            });
        } else {
            return [new Error('Please provide a property name.')];
        }

        return [null, output];
    }
};

export { configJsonArrayOfObjectsSortByProperty };
