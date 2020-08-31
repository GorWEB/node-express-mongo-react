import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const message = useMessage();
    const auth=useContext(AuthContext)
    const {loading, request,error,clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])
    const changeHandle = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token,data.userId)
        } catch (e) {}
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h2>Сокращение ссылок</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    autoFocus
                                    value={form.email}
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className='white input'
                                    onChange={changeHandle}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    value={form.password}
                                    placeholder="Введите пароль"
                                    id="password" type="password"
                                    name="password"
                                    className='white input'
                                    onChange={changeHandle}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn blue darken-4 login'
                            onClick={loginHandler}
                            disabled={loading}
                        >Войти
                        </button>
                        <button
                            className='btn green darken-1'
                            onClick={registerHandler}
                            disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}