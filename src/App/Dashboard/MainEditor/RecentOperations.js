import React from 'react';
import PropTypes from 'prop-types';

import { useAtom } from 'jotai';

import { recentOperationsAtom } from './JotaiState.js';

import IconButton from '@mui/material/IconButton/index.js';

import { IconNotAvailable } from './constOperations.js';

import { obModeConfigs } from './modes/index.js';

const RecentOperations = function ({
    mode,
    onOperationClick
}) {
    // TODO: FIXME: Check if `setRecentOperations` is needed
    // eslint-disable-next-line no-unused-vars
    const [recentOperations, setRecentOperations] = useAtom(recentOperationsAtom);

    const modeConfig = obModeConfigs[mode];
    const operationsForMode = Object.keys(modeConfig.obOperations);

    return (
        <div
            style={{
                display: 'flex',
                overflow: 'hidden',
                paddingRight: 10,
                marginLeft: 'auto',
                flexDirection: 'row-reverse'
            }}
        >
            {(() => {
                let arr = recentOperations;
                arr = arr.filter(operationId => {
                    if (operationsForMode.includes(operationId)) {
                        return true;
                    } else {
                        return false;
                    }
                });

                arr = arr.map((operationId, index) => {
                    const operationForMode = modeConfig.obOperations[operationId];
                    return (
                        <div key={index}>
                            <IconButton
                                size="small"
                                title={(
                                    operationForMode?.iconTooltip ||
                                    operationForMode?.label
                                )}
                                onClick={async () => {
                                    await onOperationClick(operationId);
                                }}
                            >
                                {(() => {
                                    let Icon = modeConfig.obOperations[operationId]?.icon;
                                    if (!Icon) {
                                        Icon = IconNotAvailable;
                                    }
                                    return <Icon style={{ fontSize: 16 }} />;
                                })()}
                            </IconButton>
                        </div>
                    );
                });

                return arr;
            })()}
        </div>
    );
};
RecentOperations.propTypes = {
    mode: PropTypes.string.isRequired,
    onOperationClick: PropTypes.func.isRequired
};

export { RecentOperations };
