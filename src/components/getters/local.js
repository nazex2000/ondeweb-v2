export const getLocalCategories = async () => {
    if (sessionStorage.getItem('localCategories')) {
        return JSON.parse(sessionStorage.getItem('localCategories'));
    } else {
        const categories = await fetchLocalCategories();
        sessionStorage.setItem('localCategories', JSON.stringify(categories));
        return categories;
    }
};

export const getBestLocals = async () => {
    if (sessionStorage.getItem('locals')) {
        return JSON.parse(sessionStorage.getItem('locals'));
    } else {
        const locals = await fetchLocals();
        sessionStorage.setItem('locals', JSON.stringify(locals));
        return locals;
    }
};

export const fetchLocalById = async (id) => {
    // Firebase logic removed — to be replaced with API or local DB later
    return null;
};

export const fetchLocalCategories = async () => {
    // Firebase logic removed — to be replaced with API or local DB later
    return [];
};

export const fetchLocals = async () => {
    // Firebase logic removed — to be replaced with API or local DB later
    return [];
};
