import React from 'react';

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import { App } from './App.js';

const router = createBrowserRouter([
    {
        // Currently, using it as SPA with query parameters, so all routes are the same. In local development, the path
        // is `/`, but in GitHub Pages, the path is `/transformers/` (https://webextensions.github.io/transformers/),
        // so, `window.location.pathname` matches that in the URL.
        path: window.location.pathname,

        element: (
            <App />
        )
    }
]);

const AppWrapper = function () {
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
};

export { AppWrapper };
