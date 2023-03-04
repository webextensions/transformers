import CircleIcon from '@mui/icons-material/Circle.js';

export const
    mode_css  = 'css',
    mode_csv  = 'csv',
    mode_json = 'json',
    mode_less = 'less',
    mode_text = 'text';

export const
    modes = [
        mode_css,
        mode_csv,
        mode_json,
        mode_less,
        mode_text
    ];

export const defaultRecommendedOperations = [
    'cssFormat',
    'csvToJson',
    'jsonFormat',
    'lessFormat',
    'textSort'
];

export const defaultSelectedOperations = {
    [mode_css]: '',
    [mode_csv]: '',
    [mode_json]: '',
    [mode_less]: '',
    [mode_text]: ''
};

export const IconNotAvailable = CircleIcon;

// const availableOperations = {};

// const allOperationsById = {};
// for (const mode in availableOperations) {
//     const operationsForMode = availableOperations[mode];
//     for (const operationId in operationsForMode) {
//         allOperationsById[operationId] = operationsForMode[operationId];
//     }
// }

// for (const mode in availableOperations) {
//     const operationsForMode = availableOperations[mode];
//     for (const operationId in operationsForMode) {
//         operationsForMode[operationId].id = operationId;
//     }
// }

// const allOperationIds = Object.keys(allOperationsById);

// export {
//     availableOperations,
//     allOperationsById,
//     allOperationIds
// };
