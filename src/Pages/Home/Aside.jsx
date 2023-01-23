import React, {useContext, useState} from 'react';
import "./Aside.scss"
import {dataColors} from "../../Utilits/Colors";
import  {v4 as uuidv4} from 'uuid'
import axios from "axios";
import {CustomContext} from "../../Utilits/Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Aside = () => {

    const [active, setActive] = useState(false);

    const [color, setColor] = useState(dataColors[0]);

    const [category, setCategory] = useState('');

    const {user, setUser, status, setStatus} = useContext(CustomContext);

    const logOutUser = () => {
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }


    const addCategory = () => {
        let newCategory = {
            categoryName: category,
            id: uuidv4(),
            color,
            tasks: []
        };



        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: [...user.categories, newCategory]})
            .then(({data})=>{
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                setActive(false)
                setCategory('')
                toast("WOW SO CUTE")

            })
            .catch((err) => toast(`sth wrong!!! ${err.message()}`))
    };

    const checkCategories = () => {
        if (user.categories.findIndex((item)=> item.categoryName ===  category) > -1){
            toast("Такая категория уже есть")
        }else {
            addCategory()
        }
    };


    const delCategory = (id) => {

        let newArrCategory = user.categories.filter((item) => item.id !== id)

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newArrCategory})
            .then(({data}) => {
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                toast("deleted")
            }).catch((err) => toast(`sth wrong!!! ${err.message()}`))
    }

    return (
        <aside className="aside">

            <button className='aside__leave' onClick={logOutUser}>Выйти</button>

            <div className={`aside__all ${status === 'all' ? 'active' : ''}` }  onClick={() => {setStatus('all')}}>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z" fill="#8B96A5"/>
                    </svg>
                </span>
                <span className="aside__text">Все задачи</span>
            </div>

            <ul className="aside__menu">

                {user.categories.map((item) => (
                    <li key={item.id} className={`aside__item ${status === item.categoryName ? 'active' : '' }`} onClick={() => setStatus(item.categoryName)}>
                        <span style={{background: item.color}} className="aside__color"/>
                        <span className="aside__text">{item.categoryName}</span>


                        <span onClick={(e)=>{
                            e.stopPropagation()
                            delCategory(item.id)
                        }} className="aside__item-del">
                            <svg width="18" height="18" viewBox="0 0 24 24"  fill="#000" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6.19L17 10.69V18.5H15V12.5H9V18.5H7V10.69L12 6.19ZM12 3.5L2 12.5H5V20.5H11V14.5H13V20.5H19V12.5H22L12 3.5Z"/>
                            </svg>
                        </span>


                    </li>
                ))}
            </ul>

            <div style={{position:'relative'}}>
                <div className="aside__create" onClick={() => setActive(prev => !prev)}>
                    <span>+</span>
                    <span className="aside__text">Добавить папку</span>



                </div>
                <div style={{display: active ? 'block' : 'none'}} className="aside__popup">
                    <input value={category} onChange={(e) => setCategory(e.target.value) } placeholder="Название категории" className="aside__field"  type="text" name="" id=""/>
                    <div  className="aside__colors" >
                        {dataColors.map((item)=> (
                            <span onClick={() => setColor(item)} className="aside__col" key={item} style={{background: item , border: color === item ? '1px solid black' : 'none'}} />
                        ))}
                    </div>
                    <button onClick={checkCategories} className="aside__add" type='button'>Добавить </button>
                    <span className="aside__popup-close" onClick={() => setActive(false)}>
                        &#10006;
                    </span>
                </div>
            </div>



        </aside>    
    );
};

export default Aside;