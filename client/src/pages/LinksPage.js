import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../Components/Loader";
import {LinkList} from "../Components/LinkList";

export const LinksPage=()=>{
    const {token}=useContext(AuthContext)
    const [links,setLinks]=useState([])
    const {request,loading}=useHttp()
    const getLinks=useCallback(async ()=>{
        const fetched=await request(`/api/link`,'GET',null,{
            Authorization: `Bearer ${token}`
        })
        setLinks(fetched)
    },[request,token])
    useEffect(()=>{
        getLinks()
    },[getLinks])
    if(loading){
        return <Loader/>
    }
    return(
        <>  <h1>Ваши ссылки</h1>
            {!loading && links && <LinkList links={links}/>}
        </>
    )
}