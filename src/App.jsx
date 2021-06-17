import React, { useContext, useState, useEffect } from 'react'
import Firebase from './firebase';
import { FirebaseContext, useFirebase } from "./firebase-context";


function App() {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <Developers />
        </FirebaseContext.Provider>
    );
};
//
/*type Developer = {
    uid: string;
    name: string;
    role: string;
};
*/
//
function Developers() {
    const firebase = useFirebase();
    const [dynamicdevs, setDevelopers] = useState([]);
    const arr = [1, 2, 3];
    const arrobj = [
        {id:10,name:'fred'},
        {id:11,name:'mary'},
        {id:12,name:'phil'},
    ];
    const devs = [
        {uid:10,name:'fred', role:'r1'},
        {uid:11,name:'mary', role:'r2'},
        {uid:12,name:'phil', role:'r3'},
    ];
    //const setDevelopers(arr => [...arr,`
    //
//    useEffectHIDE(() => {
//        /*
//        firebase.database().ref(`developers`).on('value').then((snapshot) => {
//            setDevelopers(snapshot.value());
//        });
//        */
//        let dvlprRef = firebase.database().ref(`developers`);
//        dvlprRef.on("value", (snapshot) => {
//            const the_data = snapshot.val();
//            let the_data_tweaked = [];
//            console.log(the_data);
//            Object.entries(the_data).map(item => {
//                item[1].id = item[1].uid;
//                item[1].key = item[1].uid;
//                the_data_tweaked.push(item[1])
//            })
//            console.log("A");
//            console.log(the_data_tweaked);
//            console.log("B");
//            setDevelopers(dynamicdevs => [...dynamicdevs, the_data_tweaked])
//            console.log(dynamicdevs);
//            console.log("C");
//            //setDevelopers(data);
//            //setDevelopers(snapshot.val());
//        });
//    }, [firebase]);
    useEffect(() => {
        let dvlprRef = firebase.database().ref(`developers`);
        dvlprRef.on("value", (snapshot) => {
            console.log("useEffect START")
            console.log(snapshot.val())
            console.log("1")
            let x = snapshot.val()
            console.log("2")
            console.log(typeof(x))
            console.log("3")
            console.log(x[1])
            console.log("4")
            console.log(typeof(x[1]))
            console.log("5")
            console.log("useEffect STOP")
            setDevelopers([])
            Object.entries(x).map(item => {
                console.log(item[1]);
                setDevelopers(dynamicdevs => [...dynamicdevs, item[1]])
                //item[1].id = item[1].uid;
                //item[1].key = item[1].uid;
                //the_data_tweaked.push(item[1])
                //setDevelopers(dynamicdevs => [...dynamicdevs, the_data_tweaked])
            })
            console.log(dynamicdevs);
            //setDevelopers(snapshot.val());
        });
    }, [firebase]);
    //
    const listItems = dynamicdevs.map((d) => 
        <div key={d.uid}>{d.name}</div>
    );
                
    return (
        <div>
            <p>Developers 2:</p> 
            <div>
            {listItems}
            </div>
        </div>
    )
}
            //<p>Developers 1:</p> 
             //   {arrobj.map((num) => (
              //      <div key={num.id}>{num.name}</div>
               // ))}
            //{devs.map((d) => (
             //   <div key={d.uid}>{d.name}</div>
            //))}
export default App;




/*
class App extends React.Component {
    //
    writeUserData = () => {
        Firebase.database()
            .dvlprRef("/")
            .set(this.state);
        console.log("DATA SAVED");
    };
    //
    getUserData = () => {
        let ref = Firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    };
    //  
    constructor(props){
        super(props);
        //
        if (Firebase.apps.length === 0) {
            Firebase.initializeApp(config);
        }
        //
        this.state = {
            developers: []
        }
    }
    //
    componentDidMount() {
      this.getUserData();
    }
    //
    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
            this.writeUserData();
        }
    }
    //  
    handleSubmit = event => {
        event.preventDefault();
        let name = this.refs.name.value;
        let role = this.refs.role.value;
        let uid = this.refs.uid.value;

        if (uid && name && role) {
            const { developers } = this.state;
            const devIndex = developers.findIndex(data => {
                return data.uid === uid;
            });
            developers[devIndex].name = name;
            developers[devIndex].role = role;
            this.setState({ developers });
            } 
        else if (name && role) {
            const uid = new Date().getTime().toString();
            const { developers } = this.state;
            developers.push({ uid, name, role });
            this.setState({ developers });
        }
        this.refs.name.value = "";
        this.refs.role.value = "";
        this.refs.uid.value = "";
    };
    //
    removeData = developer => {
        const { developers } = this.state;
        const newState = developers.filter(data => {
            return data.uid !== developer.uid;
        });
        this.setState({ developers: newState });
    };
    //
    updateData = developer => {
        this.refs.uid.value = developer.uid;
        this.refs.name.value = developer.name;
        this.refs.role.value = developer.role;
    };
    //
    render() {
        const { developers } = this.state;
        //
        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <h1>Firebase Development Team</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  {developers.map(developer => (
                    <div
                      key={developer.uid}
                      className="card float-left"
                      style={{ width: "18rem", marginRight: "1rem" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{developer.name}</h5>
                        <p className="card-text">{developer.role}</p>
                        <button
                          onClick={() => this.removeData(developer)}
                          className="btn btn-link"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => this.updateData(developer)}
                          className="btn btn-link"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <h1>Add new team member here</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                      <input type="hidden" ref="uid" />
                      <div className="form-group col-md-6">
                        <label>Name</label>
                        <input
                          type="text"
                          ref="name"
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Role</label>
                        <input
                          type="text"
                          ref="role"
                          className="form-control"
                          placeholder="Role"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <h3>
                    Tutorial{" "}
                    <a href="https://sebhastian.com/react-firebase-real-time-database-guide">
                      here
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </React.Fragment>
    );
  }
}
export default App
*/
