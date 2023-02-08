import React from 'react';

import './styles-reset.css';

import styles from './App.css';

import { PageHeader } from './PageHeader/PageHeader.js';
import { Dashboard } from './Dashboard/Dashboard.js';
import { PageFooter } from './PageFooter/PageFooter.js';

const App = function () {
    return (
        <div className={styles.App}>
            <PageHeader />
            <div className={styles.ContentWide}>
                <Dashboard />
            </div>
            <PageFooter />
        </div>
    );
};

export { App };
