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
    if(sessionStorage.getItem('locals')) {
        return JSON.parse(sessionStorage.getItem('locals'))
    } else {
        const locals = await fetchLocals()
        sessionStorage.setItem('locals', JSON.stringify(locals))
        return locals
    }
}

export const fetchLocalById = async (id) => {
    try {
        const doc = await firebase.firestore()
            .collection('local')
            .doc(id)
            .get()
        if (!doc.exists) {
            return
        }
        return {
            ...doc.data(),
            id: doc.id
        }
    } catch (error) {
        return
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

export const fetchLocals = async () => {
    try{
        const snapshot = await firebase.firestore()
                .collection('local')
                .orderBy('views', 'desc')
                .get()
            let locals = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                };
            }
            ).sort((a, b) => b.views - a.views);
            locals=locals.filter((item) => !item.deleted);
            return locals;
        } catch (error) {
            return []
        }
    }