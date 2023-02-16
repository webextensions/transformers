/* eslint-disable filenames/no-index */

import { modeCss } from './modeCss/index.js';
import { modeCsv } from './modeCsv/index.js';
import { modeJson } from './modeJson/index.js';
import { modeLess } from './modeLess/index.js';
import { modeList } from './modeList/index.js';

const arrModeConfigs = [
    modeCss,
    modeCsv,
    modeJson,
    modeLess,
    modeList
];

const obModeConfigs = {};

for (const modeConfig of arrModeConfigs) {
    obModeConfigs[modeConfig.modeId] = modeConfig;
}

export {
    arrModeConfigs,
    obModeConfigs
};
