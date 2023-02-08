import React, { useRef } from 'react';

import { MainEditor } from '../MainEditor/MainEditor.js';

import styles from './SingleEditor.css';

const SingleEditor = () => {
    const editorRef = useRef(null);
    return (
        <div className={styles.SingleEditor}>
            <div
                style={{
                    textAlign: 'center',
                    fontFamily: '"Transformers", sans-serif',
                    fontSize: 14,
                    letterSpacing: '0.05em',
                    color: '#777'
                }}
            >
                <span style={{ fontSize: 18 }}>I</span>nput
                {' / '}
                <span style={{ fontSize: 18 }}>O</span>utput
            </div>
            <div>
                <MainEditor
                    onLoad={(editor) => {
                        editorRef.current = editor;
                    }}
                    style={{ marginTop: 5 }}
                    editorWidth="100%"
                    editorHeight="100%"
                />
            </div>
        </div>
    );
};

export { SingleEditor };
