import React from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs/index.js';
import Tab from '@mui/material/Tab/index.js';

import { SingleEditor } from '../SingleEditor/SingleEditor.js';
import { DoubleEditor } from '../DoubleEditor/DoubleEditor.js';
import { ListOperations } from '../ListOperations/ListOperations.js';

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

const ContentTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minWidth: '1120'
                }}
            >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Transformers I"   style={{ fontFamily: '"Transformers", sans-serif' }}/>
                    <Tab label="Transformers II"  style={{ fontFamily: '"Transformers", sans-serif' }}/>
                    <Tab label="Transformers III" style={{ fontFamily: '"Transformers", sans-serif' }}/>
                </Tabs>
            </div>
            <div
                style={{
                    marginTop: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    minWidth: '1120'
                }}
            >
                <TabPanel value={value} index={0}>
                    <div>
                        <SingleEditor />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <DoubleEditor />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ListOperations />
                </TabPanel>
            </div>
        </div>
    );
};

export { ContentTabs };
