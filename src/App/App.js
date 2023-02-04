import React from 'react';

import { SnackbarProvider } from 'notistack';

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
        // Currently, using it as SPA with query parameters, so all routes are the same. In local development, the path
        // is `/`, but in GitHub Pages, the path is `/transformers/` (https://webextensions.github.io/transformers/),
        // so, `window.location.pathname` matches that in the URL.
        path: window.location.pathname,

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
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                maxSnack={3}
                dense
                preventDuplicate
                autoHideDuration={3000}
            >
                <RouterProvider router={router} />
            </SnackbarProvider>
        );
    }
}

export { App };
