import React, { useRef } from 'react';

import IconButton from '@mui/material/IconButton/index.js';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded.js';

import Checkbox from '@mui/material/Checkbox/index.js';
import FormControlLabel from '@mui/material/FormControlLabel/index.js';

import { MainEditor } from '../MainEditor/MainEditor.js';

import styles from './DoubleEditor.css';

const DoubleEditor = () => {
    const editorARef = useRef(null);
    const editorBRef = useRef(null);

    const [autoApply, setAutoApply] = React.useState(true);

    return (
        <div className={styles.TripleEditor}>
            <div style={{ display: 'flex', justifyContent: 'center', minWidth: 1120 }}>
                <div>
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
                    </div>
                    <div>
                        <MainEditor
                            placeholder="Provide text here"
                            onLoad={(editor) => {
                                editorARef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="500px"
                            editorHeight="300px"
                            // allowFileInput
                            autoApply={autoApply}
                            onComputeOutput={({ operation, output }) => {
                                editorBRef.current.setValue(output);
                            }}
                        />
                    </div>
                </div>
                <div style={{ marginLeft: 10 }}>
                    <div style={{ textAlign: 'center' }}>&nbsp;</div>
                    <div
                        style={{
                            marginTop: 55,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
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
                    <div style={{ textAlign: 'center' }}>&nbsp;</div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                            // height: '300px'
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={autoApply}
                                    onChange={(event) => {
                                        const flagAutoApply = event.target.checked;
                                        setAutoApply(flagAutoApply);

                                        if (flagAutoApply) {
                                            // TODO: Apply the operation
                                        }
                                    }}
                                />
                            }
                            label={
                                <div>
                                    <span style={{ fontSize: 12 }}>Auto-apply</span>
                                </div>
                            }
                        />
                    </div>
                </div>
                <div style={{ marginLeft: 10 }}>
                    <div
                        style={{
                            textAlign: 'center',
                            fontFamily: '"Transformers", sans-serif',
                            fontSize: 14,
                            letterSpacing: '0.05em',
                            color: '#777'
                        }}
                    >
                        <span style={{ fontSize: 18 }}>O</span>utput
                    </div>
                    <div>
                        <MainEditor
                            placeholder="Result of the operation will be available here"
                            onLoad={(editor) => {
                                editorBRef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="500px"
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
