import firebaseConfig from '../config';
import app from "firebase/app";
import "firebase/database";

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
    }

    database() {
        return app.database();
    }
}

export default Firebase;
