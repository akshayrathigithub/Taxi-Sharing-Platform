import firebase from 'firebase/app'
import 'firebase/firestore'

export const createComment = (key, Comment) => {
    return (dispatch) => {
        // make async call to data
        const firestore = firebase.firestore()
        
      firestore.collection('Posts').doc(key).update({
        CommentSection: firebase.firestore.FieldValue.arrayUnion(Comment)
    })
        
    }
}