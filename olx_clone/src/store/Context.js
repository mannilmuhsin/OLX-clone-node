import { createContext, useState } from "react";
export const authContext = createContext(null);

 function AuthContext({ children }) {
    const [user, setUser]=useState({ login: null})
    const [search, setSearch]=useState("")
    const [category, setCategory]=useState(" ")
    const [refresh, setRefresh]=useState(false)

  return (
    <authContext.Provider value={{ user, refresh, setUser, setRefresh, search, setSearch, category, setCategory}}>
      {children}
    </authContext.Provider>
  );
}
export default AuthContext