// UserContext.js
import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const defaultUser = {
    username: "admin",
    password: "admin",
    _id: "6580c5649de8d616e7d924a8",
    __v: 0
  } 

  const [user, setUser] = useState(defaultUser);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  let URL = ""
  if (process.env.NODE_ENV === "development"){
    console.log("Running in Dev mode")
    URL = "http://localhost:3000" 
  }else if (process.env.NODE_ENV === 'production'){
    console.log("Running in Production")
  }

  const [url, setURL] = useState(URL)

  return (
    <UserContext.Provider value={{ user, updateUser, url }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
