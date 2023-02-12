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
    mode_css,
    mode_csv,
    mode_json,
    mode_less,
    mode_list,

    modes,

    $css_format,
    $css_minify,

    $css_toScss,

    $list_removeEmptyLines,
    $list_removeDuplicates,

    $list_sort,
    $list_caseInsensitiveSort,
    $list_naturalSort,
    $list_randomize,
    $list_reverse,

    $list_trimLines,
    $list_removeCommaCharacterAtLineEnds,
    $list_removeQuoteAndApostropheCharacters,

    $list_getStats,

    $list_linesToJsonArray,

    $csv_removeFirstColumnFromCsv,
    $csv_removeLastColumnFromCsv,

    $csv_toJson,

    $json_format,
    $json_minify,

    $json_removeProperty,

    $json_array_reverse,

    $json_arrayOfObjects_flattenObjects,
    $json_arrayOfObjects_sortByProperty,

    $json_sort,

    $json_fixDataTypes,

    $json_toLines,
    $json_toCsv,

    $less_format,
    $less_minify,

    $less_toCss,

    defaultRecommendedOperations,

    defaultSelectedOperations
} from './constOperations.js';

import { RecentOperations } from './RecentOperations.js';

import { performOperation } from './performOperation.js';

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

    const applyTheOperation = async () => {
        const operationsByUser = [
            operation,
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
        const [err, output, extraInfo] = await performOperation({
            getInputValue,
            operation
        });

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
                const extraInfoString = JSON.stringify(extraInfo, null, '\t');
                console.error(extraInfoString);
                debouncedEnqueueSnackbar(extraInfoString);
            } else {
                if (typeof onComputeOutput === 'function') {
                    onComputeOutput({
                        operation,
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
                                        <option value={mode_css}>CSS</option>
                                        <option value={mode_csv}>CSV</option>
                                        <option value={mode_json}>JSON</option>
                                        <option value={mode_less}>Less</option>
                                        <option value={mode_list}>List</option>
                                    </Select>
                                </div>
                                <div style={{ marginLeft: 5 }}>
                                    {(() => {
                                        const disabled = (() => {
                                            if (
                                                mode === mode_json ||
                                                mode === mode_css ||
                                                mode === mode_less
                                            ) {
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

                                        {
                                            mode === mode_css &&
                                            <React.Fragment>
                                                <optgroup label="Format">
                                                    <option value={$css_format}>
                                                        Format CSS
                                                    </option>
                                                    <option value={$css_minify}>
                                                        Minify CSS
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Transform">
                                                    <option value={$css_toScss}>
                                                        CSS to SCSS
                                                    </option>
                                                </optgroup>
                                            </React.Fragment>
                                        }
                                        {
                                            mode === mode_less &&
                                            <React.Fragment>
                                                <optgroup label="Format">
                                                    <option value={$less_format}>
                                                        Format Less
                                                    </option>
                                                    <option value={$less_minify}>
                                                        Minify Less
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Transform">
                                                    <option value={$less_toCss}>
                                                        Less to CSS
                                                    </option>
                                                </optgroup>
                                            </React.Fragment>
                                        }
                                        {
                                            mode === mode_list &&
                                            <React.Fragment>
                                                <optgroup label="Lines">
                                                    <option value={$list_removeEmptyLines}>
                                                        Remove empty lines
                                                    </option>
                                                    <option value={$list_removeDuplicates}>
                                                        Remove duplicates
                                                    </option>
                                                </optgroup>

                                                <optgroup label="Sort">
                                                    <option value={$list_sort}>
                                                        Sort
                                                    </option>
                                                    <option value={$list_caseInsensitiveSort}>
                                                        Case-insensitive sort
                                                    </option>
                                                    <option value={$list_naturalSort}>
                                                        Natural sort
                                                    </option>
                                                    <option value={$list_randomize}>
                                                        Randomize
                                                    </option>
                                                    <option value={$list_reverse}>
                                                        Reverse
                                                    </option>
                                                </optgroup>

                                                <optgroup label="String">
                                                    <option value={$list_trimLines}>
                                                        Trim lines
                                                    </option>
                                                    <option value={$list_removeCommaCharacterAtLineEnds}>
                                                        Remove comma character at line ends
                                                    </option>
                                                    <option value={$list_removeQuoteAndApostropheCharacters}>
                                                        Remove &quot; and &apos; characters
                                                    </option>
                                                </optgroup>

                                                <optgroup label="Stats">
                                                    <option value={$list_getStats}>
                                                        Get Stats
                                                    </option>
                                                </optgroup>

                                                <optgroup label="Transform">
                                                    <option value={$list_linesToJsonArray}>
                                                        Lines to JSON Array
                                                    </option>
                                                </optgroup>
                                            </React.Fragment>
                                        }
                                        {
                                            mode === mode_csv &&
                                            <React.Fragment>
                                                <optgroup label="Columns">
                                                    <option value={$csv_removeFirstColumnFromCsv}>
                                                        Remove first column from CSV
                                                    </option>
                                                    <option value={$csv_removeLastColumnFromCsv}>
                                                        Remove last column from CSV
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Transform">
                                                    <option value={$csv_toJson}>
                                                        CSV to JSON
                                                    </option>
                                                </optgroup>
                                            </React.Fragment>
                                        }
                                        {
                                            mode === mode_json &&
                                            <React.Fragment>
                                                <optgroup label="Format">
                                                    <option value={$json_format}>
                                                        Format JSON
                                                    </option>
                                                    <option value={$json_minify}>
                                                        Minify JSON
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Sort">
                                                    <option value={$json_sort}>
                                                        Sort JSON
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Edit">
                                                    <option value={$json_removeProperty}>
                                                        Remove property
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Array">
                                                    <option value={$json_array_reverse}>
                                                        Reverse
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Array of objects">
                                                    <option value={$json_arrayOfObjects_flattenObjects}>
                                                        Flatten objects
                                                    </option>
                                                    <option value={$json_arrayOfObjects_sortByProperty}>
                                                        Sort by property
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Fix">
                                                    <option value={$json_fixDataTypes}>
                                                        Fix data types
                                                    </option>
                                                </optgroup>
                                                <optgroup label="Transform">
                                                    <option value={$json_toLines}>
                                                        JSON to Lines
                                                    </option>
                                                    <option value={$json_toCsv}>
                                                        JSON to CSV
                                                    </option>
                                                </optgroup>
                                            </React.Fragment>
                                        }
                                    </Select>
                                </div>

                                <div style={{ marginLeft: 5 }}>
                                    <IconButton
                                        size="small"
                                        title="Insert sample value"
                                        onClick={() => {
                                            const editor = editorRef.current;

                                            let output = [];
                                            switch (mode) {
                                                case mode_css:
                                                    output = output = [
                                                        'body {',
                                                        '    background-color: #f0f0f0;',
                                                        '}',
                                                        '',
                                                        'body h1 {',
                                                        '    color: #000000;',
                                                        '    font-size: 24px;',
                                                        '    font-weight: bold;',
                                                        '    text-align: center;',
                                                        '}',
                                                        ''
                                                    ];
                                                    break;
                                                case mode_csv:
                                                    output = [
                                                        'Name,Age,Height',
                                                        'Charlie,22,1.85',
                                                        'Bob,21,1.75',
                                                        'Alice,20,1.65',
                                                        'David,23,1.95'
                                                    ];
                                                    break;
                                                case mode_json:
                                                    output = [
                                                        '{',
                                                        '    "data": [',
                                                        '        { "name": "Charlie", "age": 22, "height": 1.85 },',
                                                        '        { "name": "Bob",     "age": 21, "height": 1.75 },',
                                                        '        { "name": "Alice",   "age": 20, "height": 1.65 },',
                                                        '        { "name": "David",   "age": 23, "height": 1.95 }',
                                                        '    ]',
                                                        '}'
                                                    ];
                                                    break;
                                                case mode_less:
                                                    output = [
                                                        '@color: #222;',
                                                        '',
                                                        'body {',
                                                        '    color: @color;',
                                                        '',
                                                        '    a {',
                                                        '        color: @color;',
                                                        '    }',
                                                        '}'
                                                    ];
                                                    break;
                                                case mode_list:
                                                    output = [
                                                        'Charlie',
                                                        'Bob',
                                                        'Alice',
                                                        'David'
                                                    ];
                                                    break;
                                                default:
                                                    output = [
                                                        'Please provide content here'
                                                    ];
                                            }

                                            editor.setValue(output.join('\n'));
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
                                        editorRef={editorRef}
                                        onValueUpdate={onValueUpdate}
                                        mode={mode}
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
