import React, { useState, useEffect } from "react"
import { Redirect, useLocation } from "react-router-dom"
import {useCookies} from 'react-cookie'

export const Callback = ()=>{
    const [redirect,setRedirect]=useState(false);
    const [cookies,setCookie]=useCookies(['cookie-name'])
    const search = useLocation().search;
    const getToken= async()=>{
        const response = await fetch(`/callback${search}`,{
        method:'POST'
        }).then(res=>{
        return res.json()
        })
        if(response.token){
        setCookie('token',response.token)
        setRedirect(true)
        }
    }
    useEffect(()=>void getToken(),[redirect])
    if(redirect){
        return(
            <Redirect to={`/search`}></Redirect>
        )
    }
    return (<h2>Loading...</h2>);
}