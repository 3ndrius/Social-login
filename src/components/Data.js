import React from 'react';
import firebase from "firebase";
const Data = () => {
    return (
        <div>
            <h1>Data component protected</h1>
            {firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Nie ma dostepu"}
        </div>
    );
}

export default Data;
