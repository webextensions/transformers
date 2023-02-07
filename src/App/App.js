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
            <Dashboard />
            <PageFooter />
        </div>
    );
};

export { App };
