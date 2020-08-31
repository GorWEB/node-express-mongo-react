import React, {useCallback, useContext, useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../Components/Loader";
import {LinkCard} from "../Components/LinkCard";

export const DetailPage=()=>{
    const {token}=useContext(AuthContext)
    const {request,loading} = useHttp()
    const linkId = useParams().id
    const [link,setLink]=useState(null)
    const getLink=useCallback(async ()=>{
        const fetched=await request(`/api/link/${linkId}`,'GET',null,{
            Authorization: `Bearer ${token}`
        })
        setLink(fetched)
    },[request,linkId,token])
    useEffect(()=>{
        getLink()
    },[getLink])
    if(loading){
        return <Loader/>
    }
    return(
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}