import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import {User} from '../models'


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  //comes from CurrentAuthenticatedUser//
  const sub = authUser?.attributes?.sub;


  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

//to prevent pooping of profile screen everytym on refresh//

useEffect(() => {
 DataStore.query(User,(user)=>user.sub('eq',sub)).then((users)=>setDbUser(users[0]))
},  [sub])


  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub ,setDbUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

//instead of importing useContext everyTym ,just send it as://
export const useAuthContext=()=>useContext(AuthContext)
