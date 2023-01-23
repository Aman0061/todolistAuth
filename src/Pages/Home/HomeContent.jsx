import React, {useContext} from 'react';
import './HomeContent.scss'
import ContentCategory from "../../Components/ContentCategory/ContentCategory";
import {CustomContext} from "../../Utilits/Context";


const HomeContent = () => {

    const {status , user} = useContext(CustomContext);

    return (
            <div className="content">

                {
                    status === 'all' ? user.categories.map((item) => <ContentCategory key={item.id} statusContent={item.categoryName}/>)
                        : <ContentCategory statusContent={status}/>
                }


            </div>
    );
};

export default HomeContent;