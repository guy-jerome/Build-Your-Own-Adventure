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

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
