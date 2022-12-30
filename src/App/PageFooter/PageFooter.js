import React from 'react';

import styles from './PageFooter.css';

import { CreatedByMessage } from 'generic-components/CreatedByMessage/CreatedByMessage.js';

class PageFooter extends React.Component {
    render() {
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
                    <div>
                        <div>
                            <CreatedByMessage />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { PageFooter };
