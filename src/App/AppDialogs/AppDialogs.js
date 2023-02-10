import React, { useEffect } from 'react';

import { DialogCssContainerQueriesNotSupported } from '../Dialogs/DialogCssContainerQueriesNotSupported.js';

const AppDialogs = function () {
    const [openCssContainerQueriesDialog, setOpenCssContainerQueriesDialog] = React.useState(false);

    useEffect(() => {
        const supportsContainerQueries = 'container' in document.documentElement.style;

        if (!supportsContainerQueries) {
            setOpenCssContainerQueriesDialog(true);
        }
    }, []);
    return (
        <React.Fragment>
            {
                openCssContainerQueriesDialog &&
                <DialogCssContainerQueriesNotSupported
                    onClose={() => {
                        setOpenCssContainerQueriesDialog(false);
                    }}
                />
            }
        </React.Fragment>
    );
};

export { AppDialogs };
