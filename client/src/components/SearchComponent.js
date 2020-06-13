import React, { useState, useEffect } from 'react'
import axios from 'axios'

const search= (arr,text)=>{
    return arr.filter(a=>{
        return a.indexOf(text)>=0;
    })
}
const getRepository= async()=>{
    return axios('https://api.github.com/repositories',{
        method: "GET"
    })
    .then(res=>res.data);
}
export const SearchComponent = function(){
    const [value, changeValue]=useState('');
    const [list,setList]=useState([])
    useEffect(()=>{
        getRepository()
        .then(res=>{
            res=res.map(a=>a.name);
            setList(res);
        })
    })
    return(
        <div>
            <input id="search" onChange={
                e=>{
                    changeValue(e.target.value)
                }
            } placeholder="Search"/>
            <ul id="list">
                {
                    search(list,value).map(a=><li>{a}</li>)
                }
            </ul>
        </div>
    );
}
