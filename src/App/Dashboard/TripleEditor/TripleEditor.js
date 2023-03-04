import React, { useRef } from 'react';

import { lazyLoadIntersectionUnionDifference } from '../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

import IconButton from '@mui/material/IconButton/index.js';
import SwapHorizontalCircleRoundedIcon from '@mui/icons-material/SwapHorizontalCircleRounded.js';

import Button from '@mui/material/Button/index.js';

import { MainEditor } from '../MainEditor/MainEditor.js';

import theEditorsStyles from '../TheEditors.css';
import styles from './TripleEditor.css';

const performABToC = async ({
    editorARef,
    editorBRef,
    editorCRef,
    operation
}) => {
    const valueA = editorARef.current.getValue();
    const valueB = editorBRef.current.getValue();

    const a = valueA.split('\n');
    const b = valueB.split('\n');

    let c = '';

    const {
        intersection,
        union,
        difference
    } = await lazyLoadIntersectionUnionDifference();

    if (operation === 'append') {
        c = [...a, ...b];
    } else if (operation === 'union') {
        c = union(a, b);
    } else if (operation === 'intersection') {
        c = intersection(a, b);
    } else if (operation === 'difference') {
        c = difference(a, b);
    }

    const valueC = c.join('\n');

    // Update C
    editorCRef.current.setValue(valueC);
};

const TripleEditor = function () {
    const editorARef = useRef(null);
    const editorBRef = useRef(null);
    const editorCRef = useRef(null);

    return (
        <div className={styles.TripleEditor}>
            <div className={styles.TripleEditorContainer}>
                <div>
                    <div className={theEditorsStyles.TransformersStyleHeading}>
                        A
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
                        />
                    </div>
                </div>
                <div
                    className={
                        styles.Combinator + ' ' +
                        styles.CombinatorAB
                    }
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
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
                <div>
                    <div className={theEditorsStyles.TransformersStyleHeading}>
                        B
                    </div>
                    <div>
                        <MainEditor
                            onLoad={(editor) => {
                                editorBRef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="100%"
                            editorHeight="300px"
                            // allowFileInput
                        />
                    </div>
                </div>
                <div
                    className={
                        styles.Combinator + ' ' +
                        styles.CombinatorFinalOperations
                    }
                >
                    <div className={styles.OperationsButtons}>
                        <Button
                            variant="contained"
                            size="small"
                            type="button"
                            style={{ display: 'block' }}
                            onClick={async () => {
                                await performABToC({
                                    editorARef,
                                    editorBRef,
                                    editorCRef,
                                    operation: 'union'
                                });
                            }}
                        >
                            A ∪ B
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            type="button"
                            style={{ display: 'block' }}
                            onClick={async () => {
                                await performABToC({
                                    editorARef,
                                    editorBRef,
                                    editorCRef,
                                    operation: 'intersection'
                                });
                            }}
                        >
                            A ∩ B
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            type="button"
                            style={{ display: 'block' }}
                            onClick={async () => {
                                await performABToC({
                                    editorARef,
                                    editorBRef,
                                    editorCRef,
                                    operation: 'append'
                                });
                            }}
                        >
                            A + B
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            type="button"
                            style={{ display: 'block' }}
                            onClick={async () => {
                                await performABToC({
                                    editorARef,
                                    editorBRef,
                                    editorCRef,
                                    operation: 'difference'
                                });
                            }}
                        >
                            A − B
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={theEditorsStyles.TransformersStyleHeading}>
                        C
                    </div>
                    <div>
                        <MainEditor
                            placeholder="Result of the operation will be available here"
                            onLoad={(editor) => {
                                editorCRef.current = editor;
                            }}
                            style={{ marginTop: 5 }}
                            editorWidth="100%"
                            editorHeight="300px"
                            // hideOperations
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TripleEditor };
