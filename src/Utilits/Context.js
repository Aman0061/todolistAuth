import React, {createContext, useState} from "react";


export const CustomContext = createContext();

export const Context = (props) => {

    const [user, setUser] = useState( {
        email: ""
    } );


    const [status, setStatus] = useState('all')

    const  value = {
        user,
        setUser,
        status,
        setStatus
    };


    return <CustomContext.Provider value ={value}>

        {props.children}

        </CustomContext.Provider>
}