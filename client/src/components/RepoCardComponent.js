import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import axios from "axios";

const showLanguages= (obj)=>{
    const arr=[];
    for(let key in obj){
        arr.push(key)
    }
    return arr
}

const getRepo = async (fullName)=>{
    const result= await axios('https://api.github.com/repos/'+fullName,{
        method: "GET",
        headers: {
            Authorization: "token fe9b07660dce9da2777b4f148ae8dd20f976f3aa",
        },
    })
    .then(({data:res})=>{
        return {
            name:res.name,
            stars:res.stargazers_count,
            lastCommitDate:res.pushed_at.slice(0,10),
            avatar_url:res.owner.avatar_url,
            login:res.owner.login,
            owner_url:res.owner.html_url,
            languages:res.languages_url,
            description:res.description,
            contributors_url:res.contributors_url
        }
    })
    const languagesPromise= axios(result.languages,{
        method: "GET",
        headers: {
            Authorization: "token fe9b07660dce9da2777b4f148ae8dd20f976f3aa",
        },
    })
    .then(res=>res.data)
    const contributorsPromise= axios(result.contributors_url,{
        method: "GET",
        headers: {
            Authorization: "token fe9b07660dce9da2777b4f148ae8dd20f976f3aa",
        },
    })
    .then(res=>res.data);
    const [languages,contributors]= await Promise.all([languagesPromise,contributorsPromise]);
    return{
        ...result,
        languages,
        contributors:contributors.slice(0,10)
    }
}
export const RepoCardComponent= ()=>{
    const {repoOwner,repoName}=useParams();
    const [info,setInfo]=useState();
    const [loading,setLoading]=useState(true);
    const refetch = async()=>{
        const result= await getRepo(repoOwner+'/'+repoName);
        setInfo(result);
        setLoading(false);
    }
    useEffect(()=>void refetch(),[]);
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        <div class='card'>
            <h2>{info.name}</h2>
            <p className="repocard-date">Last commit date: {info.lastCommitDate}</p>
            <p className="repocard-stars">Stars: {info.stars}</p>
            <div className="repocard-owner">
                <div className="repocard-login">Owner: {info.login}</div>
                <div className="repocard-avatar"><img src={info.avatar_url}/></div>
            </div>
            <p>Description:{info.description}</p>
            <p>Languages:</p>
            <ul className="repocard-languages">{showLanguages(info.languages).map(a=><li>{a}</li>)}</ul>
            <p>Most active contributors:</p>
            <ul>{info.contributors.map(a=><li className="repocard-contributors">{a.login}</li>)}</ul>
        </div>
    );
}