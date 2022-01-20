export const createProject = (projecT) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        // make async call to data
        const firestore = getFirestore()
        firestore.collection('Posts').add({
            ...projecT,
            createdAt: new Date()
        }).then( () => {
            dispatch({ type: 'Create_Project' ,projecT})
        }).catch( (err) => {
            dispatch({ type: 'Create_Project_Err'})
        })
    }
}