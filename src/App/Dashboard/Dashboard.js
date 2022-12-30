import React from 'react';

import { ListOperations } from './ListOperations/ListOperations.js';

import styles from './Dashboard.css';

const Dashboard = () => {
    return (
        <div className={styles.Dashboard}>
            <div style={{ marginTop: 45 }}>
                <ListOperations />
            </div>
        </div>
    );
};

export { Dashboard };
