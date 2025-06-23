export const getEventById = async (id) => {
    // Firebase logic removed — update this when new backend is connected
    return null;
};

export const getSponsorsByCategoriesIds = async (categoriesIds) => {
    // Firebase logic removed — update this when new backend is connected
    return [];
};

export const getEventCategories = async () => {
    if (sessionStorage.getItem('eventCategories')) {
        return JSON.parse(sessionStorage.getItem('eventCategories'));
    } else {
        const categories = await fetchEventCategories();
        sessionStorage.setItem('eventCategories', JSON.stringify(categories));
        return categories;
    }
};

export const getOrganizers = async () => {
    if (sessionStorage.getItem('organizers')) {
        return JSON.parse(sessionStorage.getItem('organizers'));
    } else {
        const categories = await fetchBestOrganizers();
        sessionStorage.setItem('organizers', JSON.stringify(categories));
        return categories;
    }
};

export const getTopEvents = async () => {
    if (sessionStorage.getItem('topEvents')) {
        return JSON.parse(sessionStorage.getItem('topEvents'));
    } else {
        let events = await fetchEvents();
        events = events.filter(event => event.destaque === true);
        sessionStorage.setItem('topEvents', JSON.stringify(events));
        return events;
    }
};

export const getPopularEvents = async () => {
    if (sessionStorage.getItem('popularEvents')) {
        return JSON.parse(sessionStorage.getItem('popularEvents'));
    } else {
        let events = await fetchEvents();
        events = events.sort((a, b) => b.views - a.views);
        sessionStorage.setItem('popularEvents', JSON.stringify(events));
        return events;
    }
};

export const getAllEvents = async () => {
    if (sessionStorage.getItem('allEvents')) {
        return JSON.parse(sessionStorage.getItem('allEvents'));
    } else {
        let events = await fetchEvents();
        events = shuffleArray(events);
        sessionStorage.setItem('allEvents', JSON.stringify(events));
        return events;
    }
};

export const fetchBestOrganizers = async () => {
    // Firebase logic removed — update this when new backend is connected
    return [];
};

export const fetchEvents = async () => {
    if (sessionStorage.getItem('events')) {
        return JSON.parse(sessionStorage.getItem('events'));
    }
    // Firebase logic removed — update this when new backend is connected
    return [];
};

export const fetchEventCategories = async () => {
    // Firebase logic removed — update this when new backend is connected
    return [];
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
