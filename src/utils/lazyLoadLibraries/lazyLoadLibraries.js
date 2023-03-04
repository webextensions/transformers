import './before-loading-less.js';

export const lazyLoadLess = async () => {
    const less = await import('less');
    return { less };
};

export const lazyLoadBeautifyCss = async () => {
    const { beautifyCss } = await import('helpmate-css/dist/index.js');
    return { beautifyCss };
};

export const lazyLoadMinifyCss = async () => {
    const { minifyCss } = await import('helpmate-css/dist/index.js');
    return { minifyCss };
};

export const lazyLoadBeautifyCssAndLess = async () => {
    const libs = await Promise.all([
        import('helpmate-css/dist/index.js'),
        import('less')
    ]);
    const { beautifyCss } = libs[0];
    const less = libs[1];
    return {
        beautifyCss,
        less
    };
};

export const lazyLoadIntersectionUnionDifference = async () => {
    const {
        intersection,
        union,
        difference
    } = await import('lodash');
    return {
        intersection,
        union,
        difference
    };
};

export const lazyLoadCssToScss = async () => {
    const { cssToScss } = await import('helpmate-css/dist/index.js');
    return { cssToScss };
};

export const lazyLoadPrettierAndParserHtml = async () => {
    const [prettier, parserHtml] = await Promise.all([
        import('prettier'),
        import('prettier/parser-html.js')
    ]);
    return {
        prettier,
        parserHtml
    };
};
