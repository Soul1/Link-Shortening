import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/Auth.context";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
  const {token, login, userId, logout, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{token, login, userId, logout, isAuthenticated}}>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
