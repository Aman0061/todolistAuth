import {Routes, Route, Navigate} from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import './style.scss'
import React, {useContext, useEffect} from "react";
import {CustomContext} from "./Utilits/Context";


function App() {

    const {setUser, user} = useContext(CustomContext)

    useEffect( () => {
        if (localStorage.getItem('user') !== null ){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])



  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
