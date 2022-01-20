import firebase from 'firebase/app'
import 'firebase/firestore'

export const ChatRooms = (ChatEvent) => {
    return (dispatch) => {
        // make async call to data
        const firestore = firebase.firestore()
        
      firestore.collection('ChatRooms').doc('7iQqm4PZarGFAcUwBOqy').update({
        Rooms: firebase.firestore.FieldValue.arrayUnion(ChatEvent)
    })
        
    }
}