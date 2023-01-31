const getCurrentSearchParamsAsJson = () => {
    const params = new URLSearchParams(window.location.search);
    const ob = {};
    for (const param of params) {
        ob[param[0]] = param[1];
    }

    return ob;
};

export { getCurrentSearchParamsAsJson };
