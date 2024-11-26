/* eslint-disable @stylistic/no-tabs */

import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

// Remove a property from a JSON object recursively
// TODO: Optimize this function
// TODO: Verify that this function works as expected for all cases
const removePropertyRecursively = (obj, propertyName) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(propertyName)) {
        delete obj[propertyName];
    } else {
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object') {
                removePropertyRecursively(obj[key], propertyName);
            } else if (Array.isArray(obj[key])) {
                for (const item of obj[key]) {
                    if (typeof item === 'object') {
                        removePropertyRecursively(item, propertyName);
                    } else {
                        // Do nothing
                    }
                }
            } else {
                // Do nothing
            }
        }
    }
};

const configJsonRemoveProperty = {
    operationId: 'jsonRemoveProperty',

    label: 'Remove property',
    icon: PlaylistRemoveIcon,

    snippets: [{
        content: [
            '[',
            '	{',
            '		"name": "Chelsea",',
            '		"age": 22,',
            '		"height": 1.85',
            '	},',
            '	{',
            '		"name": "Bob",',
            '		"age": 21,',
            '		"height": 1.75',
            '	}',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        // eslint-disable-next-line no-alert
        const propertyName = prompt('Please enter the name of the property to remove:');
        if (propertyName) {
            const output = inputJson;
            removePropertyRecursively(output, propertyName);
            return [null, output];
        } else {
            return [new Error('Please provide a property name.')];
        }
    }
};

export { configJsonRemoveProperty };
