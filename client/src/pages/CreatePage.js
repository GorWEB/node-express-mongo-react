import React, {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage=(props)=>{
    const history=useHistory()
    const {request}=useHttp()
    const auth=useContext(AuthContext)
    const [link,setLink]=useState('')
    const keyPressHandler=async (e)=>{
        if(e.key==='Enter'){
        try {
            const data=await request('api/link/generate','POST',{from:link},{
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            history.push(`/detail/${data.link._id}`)
        }catch (e) { }
        }
    }
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    return(
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop:'2 rem'}}>
                <div className="input-field">
                    <input
                        autoFocus
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e)=>setLink(e.target.value)}
                        onKeyPress={keyPressHandler}/>
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}