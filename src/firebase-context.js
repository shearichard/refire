import React, { useContext } from "react";

export const FirebaseContext = React.createContext();

//The useFirebase hook provides an easy way to grab the 
//value of the nearest FirebaseContext provider. If there 
//is no context provider where the hook is used, this will 
//throw so that issues are caught early.
export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (firebaseContext === undefined) {
    throw new Error(
      "useFirebase must be used within a FirebaseContext.Provider"
    );
  }
  return firebaseContext;
};
