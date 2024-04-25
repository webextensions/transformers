import React from 'react';

import { ContentTabs } from './ContentTabs/ContentTabs.js';

import * as styles from './Dashboard.css';

const Dashboard = () => {
    return (
        <div
            className={styles.Dashboard}
            style={{ marginTop: 35 }}
        >
            <ContentTabs />
        </div>
    );
};

export { Dashboard };
