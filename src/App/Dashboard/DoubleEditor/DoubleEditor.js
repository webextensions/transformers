import React, { useRef } from 'react';

import IconButton from '@mui/material/IconButton/index.js';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded.js';

import Checkbox from '@mui/material/Checkbox/index.js';
import FormControlLabel from '@mui/material/FormControlLabel/index.js';

import { MainEditor } from '../MainEditor/MainEditor.js';

import theEditorsStyles from '../TheEditors.css';
import styles from './DoubleEditor.css';

const DoubleEditor = () => {
    const editorARef = useRef(null);
    const editorBRef = useRef(null);

    const [autoApply, setAutoApply] = React.useState(true);

    return (
        <div className={styles.DoubleEditor}>
            <div className={styles.DoubleEditorContainer}>
                <div>
                    <div className={theEditorsStyles.TransformersStyleHeading}>
                        I<span style={{ fontSize: 14 }}>nput</span>
                    </div>
                    <div>
                        <MainEditor
                            onLoad={(editor) => {
                                editorARef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="100%"
                            editorHeight="300px"
                            // allowFileInput
                            autoApply={autoApply}
                            onComputeOutput={
                                // eslint-disable-next-line no-unused-vars
                                ({ operation, output }) => {
                                    editorBRef.current.setValue(output);
                                }
                            }
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.Combinator}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={autoApply}
                                    size="small"
                                    onChange={(event) => {
                                        const flagAutoApply = event.target.checked;
                                        setAutoApply(flagAutoApply);
                                    }}
                                />
                            }
                            label={
                                <div style={{ marginLeft: 1 }}>
                                    <span style={{ fontSize: 12 }}>Auto-apply</span>
                                </div>
                            }
                            style={{
                                // Seems that Material UI is introducing some margin, so, overriding that
                                marginLeft: 0,
                                marginRight: 0
                            }}
                        />
                    </div>
                    <div className={styles.Swap}>
                        <div
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        >
                            <IconButton
                                variant="filled"
                                color="primary"
                                size="small"
                                className={styles.SwapButton}
                                onClick={() => {
                                    const valueA = editorARef.current.getValue();
                                    const valueB = editorBRef.current.getValue();

                                    // Swap values
                                    editorARef.current.setValue(valueB);
                                    editorBRef.current.setValue(valueA);
                                }}
                            >
                                <SwapHorizontalCircleRoundedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={theEditorsStyles.TransformersStyleHeading}>
                        O<span style={{ fontSize: 14 }}>utput</span>
                    </div>
                    <div>
                        <MainEditor
                            placeholder="Result of the operation will be available here"
                            onLoad={(editor) => {
                                editorBRef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="100%"
                            editorHeight="300px"
                            // allowFileInput
                            hideOperations
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { DoubleEditor };
