import LinearScaleIcon from '@mui/icons-material/LinearScale';

// Flatten an array of objects recursively
/*
    // Sample input:
    [
        {
            "propA": "a",
            "propB": {
                "propC": "c",
                "propD": {
                    "propE": "e"
                }
            }
        },
        {
            "prop1": 1,
            "prop2": {
                "prop3": 3,
                "prop4": {
                    "prop5": 5
                }
            }
        }
    ]

    // Sample output:
    [
        {
            "propA": "a",
            "propB.propC": "c",
            "propB.propD.propE": "e"
        },
        {
            "prop1": 1,
            "prop2.prop3": 3,
            "prop2.prop4.prop5": 5
        }
    ]
*/
const flattenObjectsRecursively = (obj, parentKey) => {
    let output = {};

    for (const key of Object.keys(obj)) {
        const value = obj[key];
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object') {
            output = {
                ...output,
                ...flattenObjectsRecursively(value, newKey)
            };
        } else {
            output[newKey] = value;
        }
    }

    return output;
};

const configJsonArrayOfObjectsFlattenObjects = {
    operationId: 'jsonArrayOfObjectsFlattenObjects',

    label: 'Flatten objects',
    icon: LinearScaleIcon,

    snippets: [{
        content: [
            '[',
            '    {',
            '        "propA": "a",',
            '        "propB": {',
            '            "propC": "c",',
            '            "propD": {',
            '                "propE": "e"',
            '            }',
            '        }',
            '    },',
            '    {',
            '        "prop1": 1,',
            '        "prop2": {',
            '            "prop3": 3,',
            '            "prop4": {',
            '                "prop5": 5',
            '            }',
            '        }',
            '    }',
            ']'
        ].join('\n')
    }],

    operationInputType: 'json', // 'text' / 'json' / 'array-of-strings'
    operationOutputType: 'json', // 'text' / 'json' / 'array-of-strings'
    performOperation: ({ inputJson }) => {
        if (!Array.isArray(inputJson)) {
            return [new Error('Please provide an array of objects as the input.')];
        }

        const output = inputJson.map((item) => flattenObjectsRecursively(item));

        return [null, output];
    }
};

export { configJsonArrayOfObjectsFlattenObjects };
