import React from 'react';
import PropTypes from 'prop-types';

import { useAtom } from 'jotai';

import { recentOperationsAtom } from './JotaiState.js';

import IconButton from '@mui/material/IconButton/index.js';

import {
    IconNotAvailable,

    availableOperations,
    allOperationsById
} from './constOperations.js';

import { performOperation } from './performOperation.js';

const RecentOperations = function ({
    editorRef,
    onValueUpdate,
    mode
}) {
    const [recentOperations, setRecentOperations] = useAtom(recentOperationsAtom);

    return (
        <div
            style={{
                display: 'flex',
                width: 291,
                overflow: 'hidden',
                paddingLeft: 10
            }}
        >
            {
                recentOperations
                    .filter(operation => {
                        const operationsForMode = availableOperations[mode];
                        return operationsForMode[operation];
                    })
                    .map((operation, index) => {
                        const operationsForMode = availableOperations[mode];
                        return (
                            <div key={index}>
                                <IconButton
                                    size="small"
                                    title={(
                                        operationsForMode[operation]?.message ||
                                        operation
                                    )}
                                    onClick={async () => {
                                        // DUPLICATE: Some piece of this code is duplicated elsewhere in this project
                                        const operationsByUser = [
                                            operation,
                                            ...recentOperations
                                        ];
                                        // Remove duplicate operations (keep the first occurrence)
                                        const uniqueOperationsByUser = operationsByUser.filter((operation, index) => {
                                            return operationsByUser.indexOf(operation) === index;
                                        });
                                        setRecentOperations(uniqueOperationsByUser);
                                        localStorage.setItem('recentOperations', JSON.stringify(uniqueOperationsByUser));

                                        // DUPLICATE: Some piece of this code is duplicated elsewhere in this project
                                        const getInputValue = () => {
                                            const value = editorRef.current.getValue();
                                            return value;
                                        };
                                        const [err, output, extraInfo] = await performOperation({
                                            getInputValue,
                                            operation
                                        });

                                        if (err) {
                                            console.error(err);
                                            alert(err.message); // eslint-disable-line no-alert
                                        } else {
                                            if (output === null) {
                                                alert(JSON.stringify(extraInfo, null, '    ')); // eslint-disable-line no-alert
                                            } else {
                                                editorRef.current.setValue(output);
                                                if (typeof onValueUpdate === 'function') {
                                                    onValueUpdate(output);
                                                }
                                            }
                                        }
                                    }}
                                >
                                    {(() => {
                                        let Icon = allOperationsById[operation]?.Icon;
                                        if (!Icon) {
                                            Icon = IconNotAvailable;
                                        }
                                        return <Icon style={{ fontSize: 16 }} />;
                                    })()}
                                </IconButton>
                            </div>
                        );
                    })
            }
        </div>
    );
};
RecentOperations.propTypes = {
    editorRef: PropTypes.object.isRequired,
    onValueUpdate: PropTypes.func,
    mode: PropTypes.string.isRequired
};

export { RecentOperations };
