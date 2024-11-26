import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button/index.js';
import Dialog from '@mui/material/Dialog/index.js';
import DialogActions from '@mui/material/DialogActions/index.js';
import DialogContent from '@mui/material/DialogContent/index.js';
import DialogTitle from '@mui/material/DialogTitle/index.js';

const DialogCssContainerQueriesNotSupported = function ({
    onClose
}) {
    return (
        <Dialog
            open={true}
            onClose={onClose}
        >
            <DialogTitle>
                {'Browser upgrade required!'}
            </DialogTitle>
            <DialogContent>
                <div style={{ fontSize: 12 }}>
                    <div>
                        {'It seems that you are using an old browser which does not support "CSS container queries".'}
                    </div>
                    <div style={{ marginTop: 20 }}>
                        {'Since this tool is oriented for users with modern browsers, the older versions of browsers are not well-supported and will experience a poor user interface.'}
                    </div>
                    <div style={{ marginTop: 20 }}>
                        {'We recommend you to upgrade to the latest version of a modern browser such as Brave / Chrome / Edge / Firefox / Opera / Safari.'}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <div
                    style={{
                        marginRight: 16,
                        marginBottom: 8,
                        marginLeft: 16
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={onClose}
                        style={{
                            textTransform: 'unset'
                        }}
                    >
                        I understand
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

DialogCssContainerQueriesNotSupported.propTypes = {
    onClose: PropTypes.func.isRequired
};

export { DialogCssContainerQueriesNotSupported };
