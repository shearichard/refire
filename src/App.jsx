import React, { useContext, useState, useEffect } from 'react'
import Firebase from './firebase';
import { FirebaseContext, useFirebase } from "./firebase-context";


function Developers() {
    const firebase = useFirebase();
    const [dynamicdevs, setDevelopers] = useState([]);
    useEffect(() => {
        let dvlprRef = firebase.database().ref(`developers`);
        dvlprRef.on("value", (snapshot) => {
            let x = snapshot.val()
            setDevelopers([])
            Object.entries(x).map(item => {
                console.log(item[1]);
                setDevelopers(dynamicdevs => [...dynamicdevs, item[1]])
            })
            console.log(dynamicdevs);
        });
    }, [firebase]);
    //
    const listItems = dynamicdevs.map((d) => 
        <div key={d.uid}>{d.name}</div>
    );
    //            
    return (
        <div>
            <p>Developers 2:</p> 
            <div>
            {listItems}
            </div>
        </div>
    )
}
function App() {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <Developers />
        </FirebaseContext.Provider>
    );
};
export default App;
