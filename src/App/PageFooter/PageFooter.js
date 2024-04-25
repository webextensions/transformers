import React from 'react';

import * as styles from './PageFooter.css';

import { CreatedByMessage } from 'generic-components/CreatedByMessage/CreatedByMessage.js';

const PageFooter = function () {
    return (
        <div className={styles.PageFooter}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 45,
                    marginBottom: 20
                }}
            >
                <CreatedByMessage />
            </div>
        </div>
    );
};

export { PageFooter };
