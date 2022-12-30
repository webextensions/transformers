import { atom } from 'jotai';

import {
    allOperationIds,

    defaultRecommendedOperations
} from './constOperations.js';

const recentOperationsFromLocalStorage = localStorage.getItem('recentOperations');

let recentOperations = [];
try {
    recentOperations = JSON.parse(recentOperationsFromLocalStorage);
    if (!Array.isArray(recentOperations)) {
        recentOperations = defaultRecommendedOperations;
    }
} catch (err) {
    console.error(err);
}

// Remove operations that are not available anymore with that name
recentOperations.filter(operation => {
    return allOperationIds.includes(operation);
});

const recentOperationsAtom = atom(recentOperations);

export { recentOperationsAtom };
