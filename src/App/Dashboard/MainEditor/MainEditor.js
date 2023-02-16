import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useSearchParams  } from 'react-router-dom';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver.js'; // https://github.com/securingsincity/react-ace/issues/725#issuecomment-543109155
import 'ace-builds/src-noconflict/mode-css.js';
import 'ace-builds/src-noconflict/mode-json.js';
import 'ace-builds/src-noconflict/theme-github.js';
// import 'ace-builds/src-noconflict/ext-language_tools.js';

import IconButton from '@mui/material/IconButton/index.js';
import Button from '@mui/material/Button/index.js';

import ScienceIcon from '@mui/icons-material/Science.js';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined.js';
import BorderColorIcon from '@mui/icons-material/BorderColor.js';

import ContentCutIcon from '@mui/icons-material/ContentCut.js';
import ContentCopyIcon from '@mui/icons-material/ContentCopy.js';
import BackspaceIcon from '@mui/icons-material/Backspace.js';
import UndoIcon from '@mui/icons-material/Undo.js';
import RedoIcon from '@mui/icons-material/Redo.js';
import WrapTextIcon from '@mui/icons-material/WrapText.js';
import SaveIcon from '@mui/icons-material/Save.js';

import Select from '@mui/material/Select/index.js';

import CheckIcon from '@mui/icons-material/Check.js';

import StarIcon from '@mui/icons-material/Star.js';

import { useAtom } from 'jotai';

import { useLocalStorage } from 'react-use';

import { useSnackbar } from 'notistack';

import { useDebouncedCallback } from 'use-debounce';

import { recentOperationsAtom } from './JotaiState.js';

import { getCurrentSearchParamsAsJson } from '../utils/getCurrentSearchParamsAsJson.js';

import {
    arrModeConfigs,
    obModeConfigs
} from './modes/index.js';

import {
    mode_css,
    mode_csv,
    mode_json,
    mode_less,
    mode_list,

    modes,

    defaultRecommendedOperations,

    defaultSelectedOperations
} from './constOperations.js';

import { RecentOperations } from './RecentOperations.js';

import helperStyles from '../../helperStyles.css';
import styles from './MainEditor.css';

const copy = async function (simpleText) {
    try {
        await navigator.clipboard.writeText(simpleText);
        return true;
    } catch (e) {
        return false;
    }
};

const generateTargetSearchParamsAsJson = ({ mode, operation, selectedOperations }) => {
    const currentSearchParams = getCurrentSearchParamsAsJson();
    const targetSearchParams = { ...currentSearchParams };

    if (!targetSearchParams.mode) {
        delete targetSearchParams.mode;
    }
    if (mode) {
        targetSearchParams.mode = mode;
    }

    if (
        !targetSearchParams.operation ||
        !selectedOperations[mode] ||
        operation === ''
    ) {
        delete targetSearchParams.operation;
    }
    if (operation) {
        targetSearchParams.operation = operation;
    }

    return targetSearchParams;
};

const getSanitizedModeWithStatus = (mode) => {
    if (modes.indexOf(mode) >= 0) {
        return {
            wasAlreadyClean: true,
            mode
        };
    } else {
        return {
            wasAlreadyClean: false,
            mode: mode_list
        };
    }
};

const readable = {
    [mode_css]: 'CSS',
    [mode_csv]: 'CSV',
    [mode_json]: 'JSON',
    [mode_less]: 'LESS',
    [mode_list]: 'List'
};

const MainEditor = function ({
    placeholder,
    onLoad,
    onValueUpdate,
    allowFileInput,
    style,
    editorWidth,
    editorHeight,
    autoApply,
    onComputeOutput,
    hideOperations
}) {
    const { enqueueSnackbar } = useSnackbar();

    const [storedMode, setStoredMode] = useLocalStorage('mode', mode_json, { raw: true });
    const [mode, setMode] = useState(
        getSanitizedModeWithStatus(storedMode).mode
    );

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(
        () => {
            const modeFromSearchParams = searchParams.get('mode');
            const sanitizedModeWithStatus = getSanitizedModeWithStatus(modeFromSearchParams);

            if (sanitizedModeWithStatus.wasAlreadyClean) {
                setStoredMode(modeFromSearchParams);
                setMode(modeFromSearchParams);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // This useEffect() should run only once (at the time of mounting)
    );

    const [storedOperations, setStoredOperations] = useLocalStorage(
        'selectedOperations',
        JSON.parse(JSON.stringify(defaultSelectedOperations))
    );

    const selectedOperations = (() => {
        if (storedOperations) {
            return storedOperations;
        } else {
            return JSON.parse(JSON.stringify(defaultSelectedOperations));
        }
    })();

    const operation = selectedOperations[mode];

    const [flagSyntaxHighlighting, setFlagSyntaxHighlighting] = useLocalStorage('flagSyntaxHighlighting', 'yes', { raw: true });

    const [recentOperations, setRecentOperations] = useAtom(recentOperationsAtom);

    const [flagLineWrap, setFlagLineWrap] = useLocalStorage('flagLineWrap', 'yes', { raw: true });

    const [refreshUndoRedo, setRefreshUndoRedo] = useState(Date.now());

    const modeForSyntaxHighlighting = (() => {
        if (flagSyntaxHighlighting === 'yes') {
            switch (mode) {
                case mode_css:
                    return 'css';
                case mode_csv:
                    return 'text';
                case mode_json:
                    return 'json';
                case mode_less:
                    return 'less';
                case mode_list:
                    return 'text';
                default:
                    return 'text';
            }
        } else {
            return 'text';
        }
    })();

    // Save "editor" reference for later usage.
    const editorRef = useRef(null);

    // The "onChange" event may get called twice because of the auto-format functionality. Hence, using this "debounced"
    // function to avoid multiple calls (notifications).
    const debouncedEnqueueSnackbar = useDebouncedCallback(
        (errMessage) => {
            enqueueSnackbar(errMessage);
        },
        32
    );

    const debouncedOnChange = useDebouncedCallback(
        // eslint-disable-next-line no-unused-vars
        async (val, delta) => {
            setRefreshUndoRedo(Date.now());

            if (autoApply) {
                if (operation) { // Operation might be empty (if the user has not selected any operation)
                    await applyTheOperation();
                }
            }
        },
        750
    );

    const applyTheOperation = async (passedOperation) => {
        const operationToApply = passedOperation || operation;
        const operationsByUser = [
            operationToApply,
            ...recentOperations
        ];
        // Remove duplicate operations (keep the first occurrence)
        const uniqueOperationsByUser = operationsByUser.filter((operation, index) => {
            return operationsByUser.indexOf(operation) === index;
        });
        setRecentOperations(uniqueOperationsByUser);
        localStorage.setItem('recentOperations', JSON.stringify(uniqueOperationsByUser));

        // DUPLICATE: Some piece of this code is duplicated elsewhere in this project
        const getInputValue = () => {
            const value = editorRef.current.getValue();
            return value;
        };

        const modeConfig = obModeConfigs[mode];
        const operationId = operationToApply;
        const operationConfig = modeConfig.obOperations[operationId];

        const inputValue = getInputValue();

        if (inputValue === '') {
            // TODO: FIXME: This code is duplicated elsewhere in this project
            const output = inputValue;
            if (typeof onComputeOutput === 'function') {
                onComputeOutput({
                    operation: operationToApply,
                    output
                });
            } else {
                editorRef.current.setValue(output);
            }
            if (typeof onValueUpdate === 'function') {
                onValueUpdate(output);
            }
            return;
        }

        let
            err,
            output,
            extraInfo;

        try {
            const parameters = {};

            switch (operationConfig.operationInputType) {
                case 'json': {
                    const inputJson = JSON.parse(inputValue);
                    parameters.inputJson = inputJson;
                    break;
                }
                case 'array-of-strings': {
                    const inputArrayOfStrings = inputValue.split('\n');
                    parameters.inputArrayOfStrings = inputArrayOfStrings;
                    break;
                }
                case 'text':
                default: {
                    const inputText = inputValue;
                    parameters.inputText = inputText;
                    break;
                }
            }

            [err, output, extraInfo] = await operationConfig.performOperation(parameters);
        } catch (e) {
            err = e;
        }

        if (!err) {
            switch (operationConfig.operationOutputType) {
                case 'json': {
                    output = JSON.stringify(output, null, '\t');
                    break;
                }
                case 'array-of-strings': {
                    if (Array.isArray(output)) {
                        output = output.join('\n');
                    }
                    break;
                }
                case 'text':
                default: {
                    // Do nothing
                    break;
                }
            }
        }

        if (err) {
            console.error(err);
            debouncedEnqueueSnackbar(err.message);

            if (extraInfo && extraInfo.moveCursorTo) {
                // editorRef.current.moveCursorTo(
                //     extraInfo.moveCursorTo.row,
                //     extraInfo.moveCursorTo.column
                // );
                editorRef.current.moveCursorToPosition({
                    row: extraInfo.moveCursorTo.row,
                    column: extraInfo.moveCursorTo.column
                });

                editorRef.current.focus();
            }
        } else {
            if (output === null) {
                if (extraInfo && extraInfo.stats) {
                    // Do nothing (for now)
                } else {
                    const extraInfoString = JSON.stringify(extraInfo, null, '\t');
                    console.error(extraInfoString);
                    debouncedEnqueueSnackbar(extraInfoString);
                }
            } else {
                if (typeof onComputeOutput === 'function') {
                    onComputeOutput({
                        operation: operationToApply,
                        output
                    });
                } else {
                    editorRef.current.setValue(output);
                }
                if (typeof onValueUpdate === 'function') {
                    onValueUpdate(output);
                }
            }
        }
    };

    useEffect(() => {
        // Operation might be empty (at the time of mounting this component)
        if (autoApply && operation) {
            (async () => {
                await applyTheOperation();
            })();
        }
    }, [autoApply, operation]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={style} className={styles.MainEditor}>
            <div style={{ marginTop: 10 }}>
                <div
                    style={{ marginTop: 20 }}
                    className={styles.translucentWithoutHover}
                >
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                containerType: 'inline-size'
                            }}
                        >
                            {
                                hideOperations &&
                                <div>&nbsp;</div>
                            }
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <Select
                                        native
                                        value={mode}
                                        style={{
                                            width: 75,
                                            height: 24,
                                            fontSize: 11
                                        }}
                                        onChange={(e) => {
                                            const mode = e.target.value;
                                            setMode(mode);
                                            setStoredMode(mode);

                                            const searchParamsToApply = generateTargetSearchParamsAsJson({
                                                mode,
                                                operation: selectedOperations[mode],
                                                selectedOperations
                                            });
                                            setSearchParams(searchParamsToApply);
                                        }}
                                    >
                                        {
                                            arrModeConfigs.map((modeConfig) => {
                                                return (
                                                    <option
                                                        key={modeConfig.modeId}
                                                        value={modeConfig.modeId}
                                                    >
                                                        {modeConfig.title}
                                                    </option>
                                                );
                                            })
                                        }
                                    </Select>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                    {(() => {
                                        const disabled = (() => {
                                            const modeConfig = obModeConfigs[mode];
                                            if (modeConfig.hasSyntaxHighlighting) {
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        })();
                                        let title;
                                        if (disabled) {
                                            title = 'Syntax highlighting not available for this mode';
                                        } else {
                                            if (flagSyntaxHighlighting === 'yes') {
                                                title = 'Disable syntax highlighting';
                                            } else {
                                                title = 'Enable syntax highlighting';
                                            }
                                        }

                                        return (
                                            <IconButton
                                                size="small"
                                                title={title}
                                                onClick={() => {
                                                    if (disabled) {
                                                        // TODO: Show a tooltip message
                                                    } else {
                                                        setFlagSyntaxHighlighting(
                                                            flagSyntaxHighlighting === 'yes' ? 'no' : 'yes'
                                                        );
                                                    }
                                                }}
                                            >
                                                {(() => {
                                                    let Icon;
                                                    if (flagSyntaxHighlighting === 'yes') {
                                                        Icon = BorderColorIcon;
                                                    } else {
                                                        Icon = BorderColorOutlinedIcon;
                                                    }

                                                    let color;
                                                    if (disabled) {
                                                        color = '#ccc';
                                                    } else {
                                                        if (flagSyntaxHighlighting === 'yes') {
                                                            color = '#1976d2';
                                                        } else {
                                                            color = undefined;
                                                        }
                                                    }

                                                    return <Icon style={{ fontSize: 16, color }} />;
                                                })()}
                                            </IconButton>
                                        );
                                    })()}
                                </div>
                            </div>
                            <div
                                style={{
                                    // TODO: Use a better way to "right-align" the content (probably via appropriate "prop")
                                    display: hideOperations ? 'none' : 'flex'
                                }}
                            >
                                <div style={{ marginLeft: 5 }}>
                                    <Select
                                        native
                                        className={styles.SelectTheOperation}
                                        style={{
                                            height: 24,
                                            fontSize: 11,
                                            border: (
                                                selectedOperations[mode] === '' ?
                                                    '1px dashed orange' :
                                                    undefined
                                            )
                                        }}
                                        value={selectedOperations[mode]}
                                        onChange={(e) => {
                                            const selectedOperation = e.target.value;

                                            const json = JSON.parse(JSON.stringify(selectedOperations));
                                            json[mode] = selectedOperation;

                                            setStoredOperations(json);

                                            const searchParamsToApply = generateTargetSearchParamsAsJson({
                                                mode,
                                                operation: selectedOperation,
                                                selectedOperations
                                            });
                                            setSearchParams(searchParamsToApply);
                                        }}
                                    >
                                        <option
                                            value=""
                                            style={{ color: '#777' }}
                                        >
                                            -- Operations --
                                        </option>

                                        {(() => {
                                            const modeConfig = obModeConfigs[mode];

                                            const { operations } = modeConfig;

                                            // It has "optgroup" and there are "options" under each "optgroup"
                                            return operations.map((operation) => {
                                                return (
                                                    <optgroup
                                                        key={operation.optgroupLabel}
                                                        label={operation.optgroupLabel}
                                                    >
                                                        {
                                                            operation.options.map((option) => {
                                                                return (
                                                                    <option
                                                                        key={option.operationId}
                                                                        value={option.operationId}
                                                                    >
                                                                        {option.label}
                                                                    </option>
                                                                );
                                                            })
                                                        }
                                                    </optgroup>
                                                );
                                            });
                                        })()}
                                    </Select>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <IconButton
                                        size="small"
                                        title="Insert sample value"
                                        onClick={() => {
                                            const editor = editorRef.current;

                                            const modeConfig = obModeConfigs[mode];
                                            const selectedOperationId = selectedOperations[mode];
                                            const operation = modeConfig.obOperations[selectedOperationId];

                                            const sample = (
                                                (
                                                    operation &&
                                                    operation.snippets &&
                                                    operation.snippets[0] &&
                                                    operation.snippets[0].content
                                                ) ||
                                                (
                                                    modeConfig.snippets &&
                                                    modeConfig.snippets[0] &&
                                                    modeConfig.snippets[0].content
                                                ) ||
                                                (
                                                    'Please provide content here'
                                                )
                                            );

                                            editor.setValue(sample);
                                            editor.focus();
                                        }}
                                    >
                                        <ScienceIcon style={{ fontSize: 16 }} />
                                    </IconButton>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <IconButton
                                        size="small"
                                        className={helperStyles.hideForContainerGE640}
                                        style={{
                                            backgroundColor: '#1976d2'
                                        }}
                                        onClick={async () => {
                                            await applyTheOperation();
                                        }}
                                    >
                                        <CheckIcon
                                            style={{
                                                fontSize: 14,
                                                color: '#fff'
                                            }}
                                        />
                                    </IconButton>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<CheckIcon />}
                                        disabled={operation === ''}
                                        className={helperStyles.hideForContainerLT640}
                                        onClick={async () => {
                                            await applyTheOperation();
                                        }}
                                        style={{ height: 24 }}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        recentOperations.length > 0 &&
                        <div
                            style={{
                                marginTop: 10,
                                visibility: hideOperations ? 'hidden' : 'visible'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 999
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: 12 }}>
                                    <IconButton
                                        size="small"
                                        title="Reset suggested operations"
                                        onClick={() => {
                                            setRecentOperations(defaultRecommendedOperations);
                                            localStorage.setItem('recentOperations', JSON.stringify([]));
                                        }}
                                    >
                                        <StarIcon style={{ fontSize: 16 }} />
                                    </IconButton>
                                </div>
                                <div
                                    style={{
                                        borderRight: '1px solid #e0e0e0'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        backgroundColor: '#fff',
                                        width: '100%',
                                        borderTopLeftRadius: 999,
                                        borderBottomLeftRadius: 999
                                    }}
                                >
                                    <RecentOperations
                                        mode={mode}
                                        onOperationClick={async (operationId) => {
                                            await applyTheOperation(operationId);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div style={{ marginTop: 10 }}>
                <div>
                    <AceEditor
                        placeholder={
                            placeholder ||
                            `Provide ${readable[mode]} here`
                        }
                        setOptions={{
                            // useWorker: false,
                            // enableBasicAutocompletion: true,
                            // enableLiveAutocompletion: true,
                            // enableSnippets: true,
                            // showLineNumbers: true,
                            // tabSize: 4,
                            // useSoftTabs: true,

                            wrap: flagLineWrap === 'yes' ? true : false
                        }}
                        mode={modeForSyntaxHighlighting}
                        theme="github"
                        onLoad={(editor) => {
                            editorRef.current = editor;
                            if (typeof onLoad === 'function') {
                                onLoad(editor);
                            }
                        }}
                        onChange={(val, delta) => {
                            (async () => {
                                await debouncedOnChange(val, delta);
                            })();
                        }}
                        editorProps={{ $blockScrolling: true }}
                        width={editorWidth}
                        height={editorHeight}
                        style={{
                            minHeight: '65vh'
                        }}
                    />

                </div>
                {
                    allowFileInput &&
                    <div style={{ marginTop: 10 }}>
                        <input type="file" />
                    </div>
                }
            </div>
            <div style={{ marginTop: 10 }}>
                <div
                    className={styles.translucentWithoutHover}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div style={{ display: 'flex' }}>
                        {/* Cut button */}
                        <IconButton
                            title="Cut"
                            size="small"
                            onClick={async () => {
                                const editor = editorRef.current;
                                if (editor) {
                                    // Check if there is any selected text
                                    let selectedText = editor.getSelectedText();

                                    if (!selectedText) {
                                        // If there is no selected text, then select all text.
                                        editor.selectAll();
                                        selectedText = editor.getSelectedText();
                                    }

                                    // Copy selected contents to clipboard
                                    await copy(selectedText);

                                    // Perform cut operation
                                    editor.execCommand('cut');
                                }
                            }}
                        >
                            <ContentCutIcon style={{ fontSize: 16 }} />
                        </IconButton>

                        {/* Copy button */}
                        <IconButton
                            title="Copy"
                            size="small"
                            onClick={async () => {
                                const editor = editorRef.current;
                                if (editor) {
                                    // Check if there is any selected text
                                    let selectedText = editor.getSelectedText();

                                    if (!selectedText) {
                                        // If there is no selected text, then select all text.
                                        editor.selectAll();
                                        selectedText = editor.getSelectedText();
                                    }

                                    // Copy selected contents to clipboard
                                    await copy(selectedText);

                                    // Perform copy operation
                                    editor.execCommand('copy');
                                }
                            }}
                        >
                            <ContentCopyIcon style={{ fontSize: 16 }} />
                        </IconButton>

                        {/* Clear button */}
                        <IconButton
                            title="Clear"
                            size="small"
                            onClick={() => {
                                const editor = editorRef.current;
                                if (editor) {
                                    // Check if there is any selected text
                                    const selectedText = editor.getSelectedText();

                                    if (selectedText) {
                                        // If there is selected text, then clear only the selected text.
                                        editor.execCommand('inserttext', { text: '' });
                                    } else {
                                        editor.setValue('');
                                    }
                                }
                            }}
                        >
                            <BackspaceIcon style={{ fontSize: 16 }} />
                        </IconButton>

                        {/* Undo button */}
                        <IconButton
                            title="Undo"
                            size="small"
                            disabled={refreshUndoRedo && (() => {
                                if (
                                    editorRef.current &&
                                    editorRef.current.getSession().getUndoManager().hasUndo()
                                ) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })()}
                            onClick={() => {
                                const editor = editorRef.current;
                                if (editor) {
                                    editor.execCommand('undo');
                                }
                            }}
                        >
                            <UndoIcon style={{ fontSize: 16 }} />
                        </IconButton>

                        {/* Redo button */}
                        <IconButton
                            title="Redo"
                            size="small"
                            disabled={refreshUndoRedo && (() => {
                                if (
                                    editorRef.current &&
                                    editorRef.current.getSession().getUndoManager().hasRedo()
                                ) {
                                    return false;
                                } else {
                                    return true;
                                }
                            })()}
                            onClick={() => {
                                const editor = editorRef.current;
                                if (editor) {
                                    editor.execCommand('redo');
                                }
                            }}
                        >
                            <RedoIcon style={{ fontSize: 16 }} />
                        </IconButton>

                        {/* Line wrap button */}
                        <IconButton
                            title="Toggle line wrap"
                            size="small"
                            onClick={() => {
                                // Raw code for toggling line wrap:
                                //     editor.getSession().setUseWrapMode(!editor.getSession().getUseWrapMode());
                                setFlagLineWrap(flagLineWrap === 'yes' ? 'no' : 'yes');
                            }}
                        >
                            <WrapTextIcon
                                style={{
                                    fontSize: 16,
                                    color: flagLineWrap === 'yes' ? '#1976d2' : undefined
                                }}
                            />
                        </IconButton>

                        {/* TODO: Full screen button */}

                        {/* Save button */}
                        <IconButton
                            title="Save"
                            size="small"
                            onClick={() => {
                                const editor = editorRef.current;
                                if (editor) {
                                    const input = editor.getValue();
                                    const blob = new Blob([input], { type: 'text/plain' });
                                    const a = document.createElement('a');
                                    a.href = URL.createObjectURL(blob);
                                    let extension;
                                    switch (mode) {
                                        case mode_css:
                                            extension = 'css';
                                            break;
                                        case mode_csv:
                                            extension = 'csv';
                                            break;
                                        case mode_json:
                                            extension = 'json';
                                            break;
                                        case mode_less:
                                            extension = 'less';
                                            break;
                                        default:
                                            extension = 'txt';
                                    }
                                    const localTime = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60 * 1000)).toISOString().substring(0, 19).replace('T', ' ');
                                    const localTimeAsPartOfFilename = localTime.replace(' ', '_').replace(/:/g, '-');
                                    a.download = `output-${localTimeAsPartOfFilename}.${extension}`;
                                    a.click();
                                }
                            }}
                        >
                            <SaveIcon style={{ fontSize: 16 }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
MainEditor.propTypes = {
    placeholder: PropTypes.string,
    onLoad: PropTypes.func,
    onValueUpdate: PropTypes.func,
    allowFileInput: PropTypes.bool,
    style: PropTypes.object,
    editorWidth: PropTypes.string,
    editorHeight: PropTypes.string,
    autoApply: PropTypes.bool,
    onComputeOutput: PropTypes.func,
    hideOperations: PropTypes.bool
};

export { MainEditor };
