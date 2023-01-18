import React, {useContext} from 'react';
import {CustomContext} from "../../Utilits/Context";
import {Navigate} from "react-router-dom"

const Home = () => {

    const {user} = useContext(CustomContext);

    if (user.email.length === 0){
        return <Navigate to = '/login'/>
    }

    return (
        <section className='home'>

            <div className="content">
                
            </div>
        </section>
    );
};

export default Home;