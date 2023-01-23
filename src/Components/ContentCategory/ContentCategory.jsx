import React, {useContext, useState} from 'react';
import {CustomContext} from "../../Utilits/Context";
import ContentChekBox from "./ContentChekBox";
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from "uuid";
import axios from "axios";

const ContentCategory = ({statusContent}) => {

    const { user, setUser, status} = useContext(CustomContext);



    const [show, setShow ] = useState(false);

    const addTask = (data) => {

        let newTask = {
            ...data,
            id: uuidv4(),
            isComplete: false
        };

        let newCategories = user.categories.map((item)=>{
            if (item.categoryName === statusContent){
                return {...item, tasks : [...item.tasks, newTask]}
            }
            return item
        });

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories : newCategories})
            .then(({data})=>{
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))
                setShow(false)
                reset()
                toast("Задача добавлена")

            })
            .catch((err) => toast(`Задача не добавлена  ${err.message()}`))
    };

    const {
        register,
        reset,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm({
        mode: "onBlur"
    })

    const checkTasks = (data) => {

        let has = user.categories.find((item) => item.categoryName === statusContent).tasks.findIndex((item)=> item.taskTitle === data.taskTitle )

        if (has > -1){
            toast("Такая задача уже есть")
        }else {
            addTask(data)
        }
    };

    const delTask = (id) => {
        let newCategories = user.categories.map((item)=>{
            if (item.categoryName === statusContent){
                return {...item, tasks : item.tasks.filter((el) => el.id !== id)}
            }
            return item
        })

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories : newCategories})
            .then(({data})=>{
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))

                toast("Задача удалена ")

            })
            .catch((err) => toast(`Задача не удалена  ${err.message()}`))
    }

    const handleCompleteTask = (id) => {
        let newCategories = user.categories.map((item)=>{
            if (item.categoryName === statusContent){
                return {...item, tasks : item.tasks.map((el) => el.id === id ? {...el, isComplete: !el.isComplete} : el)}
            }
            return item
        })

        axios.patch(`http://localhost:8080/users/${user.id}`, {categories : newCategories})
            .then(({data})=>{
                setUser({
                    ...data,
                    token: user.token
                })
                localStorage.setItem('user', JSON.stringify({
                    ...data,
                    token: user.token
                }))


            })
            .catch((err) => toast(`${err.message()}`))
    }

    return (
        <>
            <div className='content__top'>
                <h2 className='content__title'>{statusContent}</h2>
                <span className="content__edit">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="grey" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.54 31.52C16.93 31.52 16.36 31.31 15.95 30.92C15.43 30.43 15.18 29.69 15.27 28.89L15.64 25.65C15.71 25.04 16.08 24.23 16.51 23.79L24.72 15.1C26.77 12.93 28.91 12.87 31.08 14.92C33.25 16.97 33.31 19.11 31.26 21.28L23.05 29.97C22.63 30.42 21.85 30.84 21.24 30.94L18.02 31.49C17.85 31.5 17.7 31.52 17.54 31.52ZM27.93 14.91C27.16 14.91 26.49 15.39 25.81 16.11L17.6 24.81C17.4 25.02 17.17 25.52 17.13 25.81L16.76 29.05C16.72 29.38 16.8 29.65 16.98 29.82C17.16 29.99 17.43 30.05 17.76 30L20.98 29.45C21.27 29.4 21.75 29.14 21.95 28.93L30.16 20.24C31.4 18.92 31.85 17.7 30.04 16C29.24 15.23 28.55 14.91 27.93 14.91Z"  />
                            <path d="M29.3399 22.95C29.3199 22.95 29.2899 22.95 29.2699 22.95C26.1499 22.64 23.6399 20.27 23.1599 17.17C23.0999 16.76 23.3799 16.38 23.7899 16.31C24.1999 16.25 24.5799 16.53 24.6499 16.94C25.0299 19.36 26.9899 21.22 29.4299 21.46C29.8399 21.5 30.1399 21.87 30.0999 22.28C30.0499 22.66 29.7199 22.95 29.3399 22.95Z"  />
                            <path d="M33 34.75H15C14.59 34.75 14.25 34.41 14.25 34C14.25 33.59 14.59 33.25 15 33.25H33C33.41 33.25 33.75 33.59 33.75 34C33.75 34.41 33.41 34.75 33 34.75Z" />
                        </svg>
                    </span>
            </div>
            <ul className='content__menu'>
                {
                    statusContent !== 'all' ?
                        user.categories.find((item) => item.categoryName === statusContent).tasks.map((item) =>(
                            <li className='content__item' key={item.id}>
                                <ContentChekBox isComplete={item.isComplete} handleCompleteTask = {handleCompleteTask} id = {item.id}/>
                                {item.taskTitle}
                                <span className='content__item-del' onClick={() => delTask(item.id)}> - </span>

                            </li>
                        )) : ''
                }
            </ul>

            {
                status !== 'all' ? <>
                    {
                        show ?

                            <form noValidate action="" className='content__add' onSubmit={handleSubmit(checkTasks)} >


                                <input {...register('taskTitle', {
                                    required:{
                                        message: 'Поле логин обязателен к заполнению ',
                                        value: true
                                    },
                                    minLength:{
                                        message:" минимальная длинна 3 символов",
                                        value: 3
                                    }
                                })} placeholder ='Текст задачи' type="text" className="content__add-field"/>
                                <span className='form__error'> {errors.taskTitle && errors.taskTitle.message} </span>

                                <div className='content__add-action'>
                                    <button className='content__add-btn'>Добавить задачи</button>
                                    <div className='content__add-close' onClick={() => setShow(false)}> Отмена</div>
                                </div>
                            </form> :


                            <div className='content__bottom'>
                <span  onClick={()=> setShow(true)}  className='content__bottom-icon'>
                    +
                </span>
                                <p className='content__bottom-text'  onClick={()=> setShow(true)}>Новая задача</p>
                            </div>
                    }
                </> : ''
            }

        </>
    );
};

export default ContentCategory;