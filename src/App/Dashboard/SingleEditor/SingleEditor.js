import React, { useRef } from 'react';

import { MainEditor } from '../MainEditor/MainEditor.js';

import theEditorsStyles from '../TheEditors.css';
import styles from './SingleEditor.css';

const SingleEditor = () => {
    const editorRef = useRef(null);
    return (
        <div className={styles.SingleEditor}>
            <div className={theEditorsStyles.TransformersStyleHeading}>
                I<span style={{ fontSize: 14 }}>nput</span>
                {' / '}
                O<span style={{ fontSize: 14 }}>utput</span>
            </div>
            <div>
                <MainEditor
                    onLoad={(editor) => {
                        editorRef.current = editor;
                    }}
                    style={{ marginTop: 5 }}
                    editorWidth="100%"
                    editorHeight="100%"
                    allowFileInput
                />
            </div>
        </div>
    );
};

export { SingleEditor };
