import React from 'react';

import styles from './PageHeader.css';

class PageHeader extends React.Component {
    render() {
        return (
            <div className={styles.PageHeader}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 25
                    }}
                >
                    <h1 style={{ margin: 0, textAlign: 'center' }}>
                        <span style={{ fontVariant: 'small-caps' }}>
                            <span style={{ letterSpacing: '0.05em', fontSize: '28px' }}>
                                {'Transformers: '}
                            </span>
                        </span>
                        <span style={{ fontVariant: 'small-caps' }}>
                            <span style={{ letterSpacing: '0.05em' }}>
                                Operations&nbsp;on&nbsp;the&nbsp;Text
                            </span>
                        </span>
                    </h1>
                    <h3 style={{ fontSize: 11, margin: '10px 0 0 0', color: '#555', textAlign: 'center' }}>
                        Operations for Lists, Sets, CSV, JSON, etc
                    </h3>
                </div>
            </div>
        );
    }
}

export { PageHeader };
