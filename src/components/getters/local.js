import { firebase } from '../../base'

export const getLocalCategories = async () => {
    if(sessionStorage.getItem('localCategories')) {
        return JSON.parse(sessionStorage.getItem('localCategories'))
    } else {
        const categories = await fetchLocalCategories()
        sessionStorage.setItem('localCategories', JSON.stringify(categories))
        return categories
    }
}

export const getBestLocals = async () => {
    if(sessionStorage.getItem('bestLocals')) {
        return JSON.parse(sessionStorage.getItem('bestLocals'))
    } else {
        const locals = await fetchBestLocals()
        sessionStorage.setItem('bestLocals', JSON.stringify(locals))
        return locals
    }
}

export const fetchLocalCategories = async () => {
    try {
        const snapshot = await firebase.firestore()
            .collection('categoriaLocal')
            .get()
        if (snapshot.empty) {
            return
        }
        const categories = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id,
                selected: false
            };
        });
        return categories;
    } catch (error) {
        return []
    }
}

export const fetchBestLocals = async () => {
    try{
        const snapshot = await firebase.firestore()
                .collection('local')
                .orderBy('views', 'desc')
                .limit(20)
                .get()
            let locals = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                };
            }
            ).sort((a, b) => b.views - a.views);
            locals=locals.filter((item) => !item.deleted);
            return locals.slice(0, 12);
        } catch (error) {
            return []
        }
    }