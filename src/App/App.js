import React from 'react';

import './styles-reset.css';
import './App.css';

import { PageHeader } from './PageHeader/PageHeader.js';
import { Dashboard } from './Dashboard/Dashboard.js';
import { PageFooter } from './PageFooter/PageFooter.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <PageHeader />
                <div>
                    <Dashboard />
                </div>
                <PageFooter />
            </div>
        );
    }
}

export { App };
