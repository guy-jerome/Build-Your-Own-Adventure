// UserContext.js
import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const defaultUser = 1

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
