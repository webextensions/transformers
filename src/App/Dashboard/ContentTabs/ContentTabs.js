import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs/index.js';
import Tab from '@mui/material/Tab/index.js';

import { useLocalStorage } from 'react-use';
import { useSearchParams  } from 'react-router-dom';

import { getCurrentSearchParamsAsJson } from '../utils/getCurrentSearchParamsAsJson.js';

import { SingleEditor } from '../SingleEditor/SingleEditor.js';
import { DoubleEditor } from '../DoubleEditor/DoubleEditor.js';
import { TripleEditor } from '../TripleEditor/TripleEditor.js';

import helperStyles from '../../helperStyles.css';
import styles from './ContentTabs.css';

const TabPanel = function (props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            {...other}
        >
            <div>
                {children}
            </div>

            {/*
                // If we wish to unmount the tab content when it is not selected
                {
                    value === index &&
                    (
                        <div>
                            {children}
                        </div>
                    )
                }
            */}
        </div>
    );
};
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

const getSanitizedTransformersWithStatus = (transformers) => {
    if (
        transformers === '1' ||
        transformers === '2' ||
        transformers === '3'
    ) {
        return {
            wasAlreadyClean: true,
            transformers
        };
    } else {
        return {
            wasAlreadyClean: false,
            transformers: '2'
        };
    }
};

const ContentTabs = () => {
    const [storedTransformers, setStoredTransformers] = useLocalStorage('transformers', '2', { raw: true });

    const transformers = getSanitizedTransformersWithStatus(storedTransformers).transformers;
    const transformersAsInt = parseInt(transformers, 10);
    const [selectedTabIndex, setSelectedTabIndex] = useState(transformersAsInt - 1);

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(
        () => {
            const transformersFromSearchParams = searchParams.get('transformers');
            const sanitizedTransformersWithStatus = getSanitizedTransformersWithStatus(transformersFromSearchParams);

            if (sanitizedTransformersWithStatus.wasAlreadyClean) {
                setStoredTransformers(transformersFromSearchParams);
                setSelectedTabIndex(
                    parseInt(sanitizedTransformersWithStatus.transformers, 10) - 1
                );
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // This useEffect() should run only once (at the time of mounting)
    );

    const handleChange = (event, newValue) => {
        setSelectedTabIndex(newValue);

        const transformers = '' + (newValue + 1);

        setStoredTransformers(transformers);

        const currentSearchParams = getCurrentSearchParamsAsJson();
        const targetSearchParams = { ...currentSearchParams };
        targetSearchParams.transformers = transformers;
        setSearchParams(targetSearchParams);
    };

    return (
        <div className={styles.ContentTabs}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    containerType: 'inline-size'
                }}
            >
                <Tabs value={selectedTabIndex} onChange={handleChange}>
                    <Tab
                        label={
                            <div
                                style={{
                                    fontFamily: '"Transformers", sans-serif',
                                    fontVariant: 'small-caps',
                                    textTransform: 'none',
                                    fontSize: 18
                                }}
                            >
                                <span className={helperStyles.hideForContainerLT640}>
                                    Transformers{' '}
                                </span>
                                I
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div
                                style={{
                                    fontFamily: '"Transformers", sans-serif',
                                    fontVariant: 'small-caps',
                                    textTransform: 'none',
                                    fontSize: 18
                                }}
                            >
                                <span className={helperStyles.hideForContainerLT640}>
                                    Transformers{' '}
                                </span>
                                II
                            </div>
                        }
                    />
                    <Tab
                        label={
                            <div
                                style={{
                                    fontFamily: '"Transformers", sans-serif',
                                    fontVariant: 'small-caps',
                                    textTransform: 'none',
                                    fontSize: 18
                                }}
                            >
                                <span className={helperStyles.hideForContainerLT640}>
                                    Transformers{' '}
                                </span>
                                III
                            </div>
                        }
                    />
                </Tabs>
            </div>
            <div style={{ marginTop: 40 }}>
                <TabPanel value={selectedTabIndex} index={0}>
                    <div>
                        <SingleEditor />
                    </div>
                </TabPanel>
                <TabPanel value={selectedTabIndex} index={1}>
                    <div>
                        <DoubleEditor />
                    </div>
                </TabPanel>
                <TabPanel value={selectedTabIndex} index={2}>
                    <TripleEditor />
                </TabPanel>
            </div>
        </div>
    );
};

export { ContentTabs };
