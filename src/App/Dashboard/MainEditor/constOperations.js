export { default as IconNotAvailable } from '@mui/icons-material/Circle';

export const
    mode_css  = 'css',
    mode_csv  = 'csv',
    mode_html = 'html',
    mode_json = 'json',
    mode_less = 'less',
    mode_text = 'text';

export const
    modes = [
        mode_css,
        mode_csv,
        mode_html,
        mode_json,
        mode_less,
        mode_text
    ];

export const defaultRecommendedOperations = [
    'cssFormat',
    'csvToJson',
    'htmlFormat',
    'jsonFormat',
    'lessFormat',
    'textSort'
];

export const defaultSelectedOperations = {
    [mode_css]: 'cssFormat',
    [mode_csv]: 'csvToJson',
    [mode_html]: 'htmlFormat',
    [mode_json]: 'jsonFormat',
    [mode_less]: 'lessFormat',
    [mode_text]: 'textSort'
};

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
