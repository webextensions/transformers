// import React from 'react';

import CircleIcon from '@mui/icons-material/Circle.js';

import CompressIcon from '@mui/icons-material/Compress.js';

import DataObjectIcon from '@mui/icons-material/DataObject.js';

import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet.js';
import CopyAllIcon from '@mui/icons-material/CopyAll.js';
// import RestaurantIcon from '@mui/icons-material/Restaurant.js';

import SortIcon from '@mui/icons-material/Sort.js';
import AbcIcon from '@mui/icons-material/Abc.js';
import ParkIcon from '@mui/icons-material/Park.js';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn.js';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown.js';

import CommitIcon from '@mui/icons-material/Commit.js';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices.js';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote.js';

import ReorderIcon from '@mui/icons-material/Reorder.js';
import AppsIcon from '@mui/icons-material/Apps.js';
import MoodIcon from '@mui/icons-material/Mood.js';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove.js';
import CategoryIcon from '@mui/icons-material/Category.js';

import BuildIcon from '@mui/icons-material/Build.js';

import FirstPageIcon from '@mui/icons-material/FirstPage.js';
import LastPageIcon from '@mui/icons-material/LastPage.js';

// import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop.js';
// import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom.js';

import BarChartIcon from '@mui/icons-material/BarChart.js';
// import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl.js';
// import SubtitlesIcon from '@mui/icons-material/Subtitles.js';
// import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined.js';

// eslint-disable-next-line import/exports-last
export const
    mode_css  = 'css',
    mode_csv  = 'csv',
    mode_json = 'json',
    mode_less = 'less',
    mode_list = 'list';

// eslint-disable-next-line import/exports-last
export const
    modes = [
        mode_css,
        mode_csv,
        mode_json,
        mode_less,
        mode_list
    ];

// eslint-disable-next-line import/exports-last
export const
    $css_format                              = 'cssFormat',
    $css_minify                              = 'cssMinify',

    $css_toScss                              = 'cssToScss',

    $list_removeEmptyLines                   = 'listRemoveEmptyLines',
    $list_removeDuplicates                   = 'listRemoveDuplicates',
    // $list_removeBeyondNLines              = 'listRemoveBeyondNLines',

    $list_sort                               = 'listSort',
    $list_caseInsensitiveSort                = 'listCaseInsensitiveSort',
    $list_naturalSort                        = 'listNaturalSort',
    $list_randomize                          = 'listRandomize',
    $list_reverse                            = 'listReverse',

    $list_trimLines                          = 'listTrimLines',
    $list_removeCommaCharacterAtLineEnds     = 'listRemoveCommaCharacterAtLineEnds',
    $list_removeQuoteAndApostropheCharacters = 'listRemoveQuoteAndApostropheCharacters',

    $list_getStats                           = 'listGetStats',
    // $list_countLines                      = 'listCountLines',
    // $list_countCharacters                 = 'listCountCharacters',
    // $list_countWords                      = 'listCountWords',
    // $list_countUniqueWords                = 'listCountUniqueWords',

    $list_linesToJsonArray                   = 'listLinesToJsonArray',

    $csv_removeFirstColumnFromCsv            = 'csvRemoveFirstColumnFromCsv',
    $csv_removeLastColumnFromCsv             = 'csvRemoveLastColumnFromCsv',

    $csv_toJson                              = 'csvToJson',

    $json_format                             = 'jsonFormat',
    $json_minify                             = 'jsonMinify',

    $json_sort                               = 'jsonSort',

    $json_removeProperty                     = 'jsonRemoveProperty',

    $json_fixDataTypes                       = 'jsonFixDataTypes',

    // $json_removeFirstProperty             = 'jsonRemoveFirstProperty',
    // $json_removeLastProperty              = 'jsonRemoveLastProperty',

    $json_toLines                            = 'jsonToLines',
    $json_toCsv                              = 'jsonToCsv',

    $less_format                             = 'lessFormat',
    $less_minify                             = 'lessMinify',

    $less_toCss                              = 'lessToCss';


// eslint-disable-next-line import/exports-last
export const defaultRecommendedOperations = [
    $css_format,
    $csv_toJson,
    $json_format,
    $less_format,
    $list_sort
];

// eslint-disable-next-line import/exports-last
export const defaultSelectedOperations = {
    [mode_css]: '',
    [mode_csv]: '',
    [mode_json]: '',
    [mode_less]: '',
    [mode_list]: ''
};

// eslint-disable-next-line import/exports-last
export const IconNotAvailable = CircleIcon;

const
    availableOperations = {
        [mode_css]: {
            [$css_format]                              : { message: 'Format CSS',                             Icon: MoodIcon },
            [$css_minify]                              : { message: 'Minify CSS',                             Icon: CompressIcon },

            [$css_toScss]                              : { message: 'CSS to SCSS',                            Icon: DataObjectIcon }
        },
        [mode_csv]: {
            [$csv_removeFirstColumnFromCsv]            : { message: 'Remove first column from CSV',           Icon: FirstPageIcon },
            [$csv_removeLastColumnFromCsv]             : { message: 'Remove last column from CSV',            Icon: LastPageIcon },

            [$csv_toJson]                              : { message: 'CSV to JSON',                            Icon: DataObjectIcon }
        },
        [mode_json]: {
            [$json_format]                             : { message: 'Format JSON',                            Icon: MoodIcon },
            [$json_minify]                             : { message: 'Minify JSON',                            Icon: CompressIcon },

            [$json_sort]                               : { message: 'Sort JSON',                              Icon: CategoryIcon },

            [$json_removeProperty]                     : { message: 'Remove property',                        Icon: PlaylistRemoveIcon },

            [$json_fixDataTypes]                       : { message: 'Fix data types',                         Icon: BuildIcon },

            // [$json_removeFirstProperty]             : { message: 'Remove first property',                  Icon: VerticalAlignTopIcon },
            // [$json_removeLastProperty]              : { message: 'Remove last property',                   Icon: VerticalAlignBottomIcon },

            [$json_toLines]                            : { message: 'JSON to lines',                          Icon: ReorderIcon },
            [$json_toCsv]                              : { message: 'JSON to CSV',                            Icon: AppsIcon }
        },
        [mode_less]: {
            [$less_format]                             : { message: 'Format LESS',                            Icon: MoodIcon },
            [$less_minify]                             : { message: 'Minify LESS',                            Icon: CompressIcon },

            [$less_toCss]                              : { message: 'LESS to CSS',                            Icon: DataObjectIcon }
        },
        [mode_list]: {
            [$list_removeEmptyLines]                   : { message: 'Remove empty lines',                     Icon: SettingsEthernetIcon },
            [$list_removeDuplicates]                   : { message: 'Remove duplicates',                      Icon: CopyAllIcon },
            // [$list_removeBeyondNLines]              : { message: 'Remove beyond N lines',                  Icon: RestaurantIcon },

            [$list_sort]                               : { message: 'Sort',                                   Icon: SortIcon },
            [$list_caseInsensitiveSort]                : { message: 'Case-insensitive sort',                  Icon: AbcIcon },
            [$list_naturalSort]                        : { message: 'Natural sort',                           Icon: ParkIcon },
            [$list_randomize]                          : { message: 'Randomize',                              Icon: ShuffleOnIcon },
            [$list_reverse]                            : { message: 'Reverse',                                Icon: KeyboardDoubleArrowDownIcon },

            [$list_trimLines]                          : { message: 'Trim lines',                             Icon: CommitIcon },
            [$list_removeCommaCharacterAtLineEnds]     : { message: 'Remove comma character at line ends',    Icon: CleaningServicesIcon },
            [$list_removeQuoteAndApostropheCharacters] : { message: 'Remove quote and apostrophe characters', Icon: FormatQuoteIcon },

            [$list_getStats]                           : { message: 'Get stats',                              Icon: BarChartIcon },
            // [$list_countLines]                      : { message: 'Count lines',                            Icon: FormatListNumberedRtlIcon },
            // [$list_countCharacters]                 : { message: 'Count characters',                       Icon: AbcIcon },
            // [$list_countWords]                      : { message: 'Count words',                            Icon: SubtitlesIcon },
            // [$list_countUniqueWords]                : { message: 'Count unique words',                     Icon: SubtitlesOutlinedIcon },

            [$list_linesToJsonArray]                   : { message: 'Lines to JSON Array',                    Icon: DataObjectIcon }
        }
    };

const allOperationsById = {};
for (const mode in availableOperations) {
    const operationsForMode = availableOperations[mode];
    for (const operationId in operationsForMode) {
        allOperationsById[operationId] = operationsForMode[operationId];
    }
}

for (const mode in availableOperations) {
    const operationsForMode = availableOperations[mode];
    for (const operationId in operationsForMode) {
        operationsForMode[operationId].id = operationId;
    }
}

const allOperationIds = Object.keys(allOperationsById);

export {
    availableOperations,
    allOperationsById,
    allOperationIds
};
