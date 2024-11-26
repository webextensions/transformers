import { modeCss } from './modeCss/index.js';
import { modeCsv } from './modeCsv/index.js';
import { modeHtml } from './modeHtml/index.js';
import { modeJson } from './modeJson/index.js';
import { modeLess } from './modeLess/index.js';
import { modeText } from './modeText/index.js';

const arrModeConfigs = [
    modeCss,
    modeCsv,
    modeHtml,
    modeJson,
    modeLess,
    modeText
];

const obModeConfigs = {};

for (const modeConfig of arrModeConfigs) {
    obModeConfigs[modeConfig.modeId] = modeConfig;
}

export {
    arrModeConfigs,
    obModeConfigs
};
