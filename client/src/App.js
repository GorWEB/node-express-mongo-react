import React from 'react'
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./Components/Navbar";
import {Loader} from "./Components/Loader";
import 'materialize-css'

const App = () => {
    const {login, logout, token, userId,ready} = useAuth();
    const isAuth=!!token
    const routes = useRoutes(isAuth);
    if(!ready){
        return <Loader/>
    }
    return (
        <BrowserRouter >
            <AuthContext.Provider value={{
                token,userId,login,logout,isAuth
            }}>
                {isAuth && <Navbar/>}
                <div className='container'>
                        {routes}
                </div>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
