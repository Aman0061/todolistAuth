import React, {useContext} from 'react';
import Form from "../../Components/Form/Form";
import './Login.scss'
import {Navigate} from "react-router-dom";
import {CustomContext} from "../../Utilits/Context";

const Login = () => {





    return (
        <div className='login'>
           <Form/>
        </div>
    );
};

export default Login;