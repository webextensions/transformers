/* eslint-disable import/no-default-export */
/* eslint-disable filenames/match-exported */

import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver.js'; // https://github.com/securingsincity/react-ace/issues/725#issuecomment-543109155
import 'ace-builds/src-noconflict/mode-css.js';
import 'ace-builds/src-noconflict/mode-html.js';
import 'ace-builds/src-noconflict/mode-json.js';
import 'ace-builds/src-noconflict/theme-github.js';
// import 'ace-builds/src-noconflict/ext-language_tools.js';

export default AceEditor;
