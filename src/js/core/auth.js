import firebase from '../../configuration/firebaseConfig';

export function initAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Logged in:", user.uid);
        } else {
            firebase.auth().signInAnonymously().catch(error => {
                console.error("Error during anonymous sign-in:", error);
            });
        }
    });
}
