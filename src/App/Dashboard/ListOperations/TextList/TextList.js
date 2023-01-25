import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver.js'; // https://github.com/securingsincity/react-ace/issues/725#issuecomment-543109155
import 'ace-builds/src-noconflict/mode-css.js';
import 'ace-builds/src-noconflict/mode-json.js';
import 'ace-builds/src-noconflict/theme-github.js';
// import 'ace-builds/src-noconflict/ext-language_tools.js';

import IconButton from '@mui/material/IconButton/index.js';
import Button from '@mui/material/Button/index.js';

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

import { recentOperationsAtom } from './JotaiState.js';

import {
    mode_css,
    mode_csv,
    mode_json,
    mode_list,

    $css_sample_css,

    $css_formatCss,
    $css_minifyCss,

    $css_cssToScss,

    $list_sample_list,

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

    $csv_sample_csv,

    $csv_removeFirstColumnFromCsv,
    $csv_removeLastColumnFromCsv,

    $csv_csvToJson,

    $json_sample_json,

    $json_formatJson,
    $json_minifyJson,

    $json_removeProperty,

    $json_sortJson,

    $json_fixDataTypes,

    $json_jsonToLines,
    $json_jsonToCsv,

    defaultRecommendedOperations
} from './constOperations.js';

import { RecentOperations } from './RecentOperations.js';

import { performOperation } from './performOperation.js';

import styles from './TextList.css';

const copy = async function (simpleText) {
    try {
        await navigator.clipboard.writeText(simpleText);
        return true;
    } catch (e) {
        return false;
    }
};

const TextList = function ({
    placeholder,
    onLoad,
    onValueUpdate,
    allowFileInput,
    style,
    editorWidth,
    editorHeight
}) {
    const [mode, setMode] = useLocalStorage('mode', mode_list, { raw: true });

    const [selectedOperations, setSelectedOperations] = useLocalStorage('selectedOperations', {
        [mode_css]: '',
        [mode_csv]: '',
        [mode_json]: '',
        [mode_list]: ''
    });

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

    return (
        <div style={style} className={styles.TextList}>
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
                    <div style={{ display: 'flex' }}>
                        <div>
                            {(() => {
                                const disabled = (() => {
                                    if (
                                        mode === mode_json ||
                                        mode === mode_css
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
                                        // style={{ marginLeft: 5 }}
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
                        <div style={{ marginLeft: 5 }}>
                            <Select
                                native
                                value={mode}
                                style={{
                                    width: 75,
                                    height: 24,
                                    fontSize: 11
                                }}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value={mode_css}>CSS</option>
                                <option value={mode_csv}>CSV</option>
                                <option value={mode_json}>JSON</option>
                                <option value={mode_list}>List</option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 10 }}>
                <div>
                    <AceEditor
                        placeholder={placeholder}
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
                        onChange={(evt) => {
                            setRefreshUndoRedo(Date.now());
                            if (typeof onValueUpdate === 'function') {
                                onValueUpdate(evt.target.value);
                            }
                        }}
                        editorProps={{ $blockScrolling: true }}
                        width={editorWidth}
                        height={editorHeight}
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
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <Select
                            native
                            style={{
                                width: 220,
                                height: 28,
                                fontSize: 11
                            }}
                            value={selectedOperations[mode]}
                            onChange={(e) => {
                                const json = JSON.parse(JSON.stringify(selectedOperations));
                                json[mode] = e.target.value;
                                setSelectedOperations(json);
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
                                    <optgroup label="Sample">
                                        <option value={$css_sample_css}>
                                            Sample CSS
                                        </option>
                                    </optgroup>
                                    <optgroup label="Format">
                                        <option value={$css_formatCss}>
                                            Format CSS
                                        </option>
                                        <option value={$css_minifyCss}>
                                            Minify CSS
                                        </option>
                                    </optgroup>
                                    <optgroup label="Transform">
                                        <option value={$css_cssToScss}>
                                            CSS to SCSS
                                        </option>
                                    </optgroup>
                                </React.Fragment>
                            }
                            {
                                mode === mode_list &&
                                <React.Fragment>
                                    <optgroup label="Sample">
                                        <option value={$list_sample_list}>
                                            Sample list
                                        </option>
                                    </optgroup>

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
                                    <optgroup label="Sample">
                                        <option value={$csv_sample_csv}>
                                            Sample CSV
                                        </option>
                                    </optgroup>
                                    <optgroup label="Columns">
                                        <option value={$csv_removeFirstColumnFromCsv}>
                                            Remove first column from CSV
                                        </option>
                                        <option value={$csv_removeLastColumnFromCsv}>
                                            Remove last column from CSV
                                        </option>
                                    </optgroup>
                                    <optgroup label="Transform">
                                        <option value={$csv_csvToJson}>
                                            CSV to JSON
                                        </option>
                                    </optgroup>
                                </React.Fragment>
                            }
                            {
                                mode === mode_json &&
                                <React.Fragment>
                                    <optgroup label="Sample">
                                        <option value={$json_sample_json}>
                                            Sample JSON
                                        </option>
                                    </optgroup>
                                    <optgroup label="Format">
                                        <option value={$json_formatJson}>
                                            Format JSON
                                        </option>
                                        <option value={$json_minifyJson}>
                                            Minify JSON
                                        </option>
                                    </optgroup>
                                    <optgroup label="Edit">
                                        <option value={$json_removeProperty}>
                                            Remove property
                                        </option>
                                    </optgroup>
                                    <optgroup label="Sort">
                                        <option value={$json_sortJson}>
                                            Sort JSON
                                        </option>
                                    </optgroup>
                                    <optgroup label="Fix">
                                        <option value={$json_fixDataTypes}>
                                            Fix data types
                                        </option>
                                    </optgroup>
                                    <optgroup label="Transform">
                                        <option value={$json_jsonToLines}>
                                            JSON to Lines
                                        </option>
                                        <option value={$json_jsonToCsv}>
                                            JSON to CSV
                                        </option>
                                    </optgroup>
                                </React.Fragment>
                            }
                        </Select>
                    </div>
                    <div style={{ marginLeft: 5 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<CheckIcon />}
                            disabled={operation === ''}
                            onClick={async () => {
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
                                    alert(err.message); // eslint-disable-line no-alert
                                } else {
                                    if (output === null) {
                                        alert(JSON.stringify(extraInfo, null, '\t')); // eslint-disable-line no-alert
                                    } else {
                                        editorRef.current.setValue(output);
                                        if (typeof onValueUpdate === 'function') {
                                            onValueUpdate(output);
                                        }
                                    }
                                }
                            }}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
                {
                    recentOperations.length > 0 &&
                    <div style={{ marginTop: 10 }}>
                        <div
                            style={{
                                display: 'flex',
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
                                    borderTopRightRadius: 999,
                                    borderBottomRightRadius: 999
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
    );
};
TextList.propTypes = {
    placeholder: PropTypes.string,
    onLoad: PropTypes.func,
    onValueUpdate: PropTypes.func,
    allowFileInput: PropTypes.bool,
    style: PropTypes.object,
    editorWidth: PropTypes.string,
    editorHeight: PropTypes.string
};

export { TextList };
