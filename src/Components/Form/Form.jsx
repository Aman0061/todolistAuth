import React, {useContext} from 'react';
import {Link, useNavigate, useLocation, Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import './Form.scss'
import {CustomContext} from "../../Utilits/Context";

const Form = () => {


    const location = useLocation();

    const navigate = useNavigate();

    const {setUser, user} = useContext(CustomContext)

    const {
        register,
        reset,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm({mode: "onBlur"});

    const registerUser = (data) => {
        axios.post('http://localhost:8080/register', {
            ...data,
            categories:[]
        }).then((res) => {
            setUser ({
                token : res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token : res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        })
            .catch((err)=> console.log(err))
    };

    const loginUser = (data) => {
        axios.post('http://localhost:8080/login', {
            ...data
        }).then((res) => {
            setUser ({
                token : res.data.accessToken,
                ...res.data.user
            })
            localStorage.setItem('user', JSON.stringify({
                token : res.data.accessToken,
                ...res.data.user
            }))
            reset()
            navigate('/')
        }).catch((err)=> console.log(err))
    };


    if (user.email.length !== 0){
        return <Navigate to = '/'/>
    }


    const onSubmit = (data) => {
        location.pathname === '/register' ? registerUser( data) : loginUser(data)
    };
    return (
        <form noValidate className='form' onSubmit = {handleSubmit(onSubmit)}>
            <h2 className='form__title'>
                {
                    location.pathname === '/register' ? 'Регистрация ' : 'Вход'
                }
            </h2>
            {
                location.pathname === '/register' ? <>            <label className='form__label'>
                    <input autoComplete= 'off' {...register ('login' , {
                        required:{
                            message: 'Поле логин обязателен к заполнению ',
                            value: true
                        },
                        maxLength: {
                            message: 'Максимальная длинна 10 знаков',
                            value: 10
                        },
                        minLength:{
                            message:" минимальная длинна 3 символов",
                            value: 3
                        }
                    })} className='form__field' type="text" placeholder='Введите логин'/>

                    <span className='form__error'> {errors.login && errors.login.message} </span>
                </label>
                </> : ''
            }



            <label className='form__label'>
                <input {...register('email', {
                    required:{
                        message:'Email обязателен к заполнению ',
                        value: true
                    },
                    minLength:{
                        message: 'Минимально 3 знака',
                        value: true
                    }
                })} className='form__field' type="email" placeholder='Введите Email'/>

                <span className='form__error'> {errors.email && errors.email.message} </span>
            </label>

            <label className='form__label'>
                <input  {...register('password', {
                    required:{
                        message:'Пароль обязателен к заполнению',
                        value: true
                    },
                    minLength:{
                        message: 'Минимальное кол-во символов 5',
                        value: 5
                    }
                })} className='form__field' type="password" placeholder='Введите пароль'/>
                <span className='form__error'> {errors.password && errors.password.message} </span>
            </label>
            {/*<label className='form__label' >*/}
            {/*     <input className='form__field' type="password" placeholder='Введите пароль еще раз'/>*/}
            {/*</label>*/}

            <button className='form__btn' type='submit'>
                {
                    location.pathname === '/register' ? 'Регистрация ' : 'Войти'
                }
            </button>

            <p className='form__text'>
                {
                    location.pathname === '/register' ? <>У меня уже есть аккаунт чтоб <Link className='form__link' to='/login'>войти</Link></>
                        : <>Нет аккаунта? <Link className='form__link' to='/register'>Зарегистрироваться</Link></>
                }

            </p>

        </form>

    );
};

export default Form;