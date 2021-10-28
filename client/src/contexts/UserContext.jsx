import { createContext, useState } from "react";

const KEY = "travel-planner-app";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const storedUser = JSON.parse(localStorage.getItem(KEY));
  const [user, setUser] = useState(storedUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
