import React from 'react';

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import './styles-reset.css';
import './App.css';

import { PageHeader } from './PageHeader/PageHeader.js';
import { Dashboard } from './Dashboard/Dashboard.js';
import { PageFooter } from './PageFooter/PageFooter.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <PageHeader />
                <div>
                    <Dashboard />
                </div>
                <PageFooter />
            </div>
        )
    },
    // TODO: Avoid code duplication
    {
        path: '/transformers/',
        element: (
            <div>
                <PageHeader />
                <div>
                    <Dashboard />
                </div>
                <PageFooter />
            </div>
        )
    }
]);

class App extends React.Component {
    render() {
        return (
            <RouterProvider router={router} />
        );
    }
}

export { App };
