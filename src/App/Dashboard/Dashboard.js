import React from 'react';

import { ContentTabs } from './ContentTabs/ContentTabs.js';

import styles from './Dashboard.css';

const Dashboard = () => {
    return (
        <div className={styles.Dashboard}>
            <div style={{ marginTop: 35 }}>
                <ContentTabs />
            </div>
        </div>
    );
};

export { Dashboard };
