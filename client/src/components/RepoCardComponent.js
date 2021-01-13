import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {Rate, Card, Divider, Badge, Row, Col, Statistic, PageHeader, Descriptions} from 'antd'
import axios from "axios";

const {Meta}=Card



const getRepo = async (fullName,token)=>{
    const result= await axios('https://api.github.com/repos/'+fullName,{
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
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
            Authorization: `token ${token}`,
        },
    })
    .then(res=>res.data)
    const contributorsPromise= axios(result.contributors_url,{
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
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
    const [repo,setRepo]=useState();
    const [loading,setLoading]=useState(true);
    //Получаем access token
    const [cookies,setCookie]=useCookies(['token'])
    const token = cookies.token;
    const colors = [
        'pink',
        'red',
        'yellow',
        'orange',
        'cyan',
        'green',
        'blue',
        'purple',
        'geekblue',
        'magenta',
        'volcano',
        'gold',
        'lime',
      ];
    const refetch = async()=>{
        const result= await getRepo(repoOwner+'/'+repoName, token);
        setRepo(result);
        setLoading(false);
    }
    useEffect(()=>void refetch(),[]);
    if(loading){
        return <h2>Loading...</h2>
    }
    const showLanguages= ()=>{
        const arr=[];
        for(let key in repo.languages){
            arr.push(key)
        }
        if(arr.length){
            return (
                <div>
                    <Divider orientation="left">Languages</Divider>
                    {arr.map((item,index) => (
                        <div key={colors[index]}>
                            <Badge color={colors[index]} text={item} />
                        </div>
                    ))}
                </div>
            )
        }
    }
    const showContributors= ()=>{
        return (
            <div>
                <Divider orientation="left">Most active contributors</Divider>
                {repo.contributors.map((contributor,index) => (
                    <div key={colors[index]}>
                        <Badge color={colors[index]} text={contributor.login} />
                    </div>
                ))}
            </div>
        )
    }
    return(
        <div>
            <PageHeader
                id='title'
                className="site-page-header"
                onBack={() => window.history.back()}
                title={repo.name}
            />
            <Row>
                <Col span={8}>
                <Descriptions size="small" style={{display:'inline-block'}} column={1}>
                    <Descriptions.Item label="Owner">{repo.login}</Descriptions.Item>
                    <Descriptions.Item label="Last commit date">{repo.lastCommitDate}</Descriptions.Item>
                </Descriptions>
                </Col>
                <Col span={8}>
                    <Statistic title="Stars" value={repo.stars} prefix={<Rate disabled defaultValue={1} count={1}/>}/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Card
                        style={{ width: 240 }}
                        cover={<img alt="example" src={repo.avatar_url} />}
                    >
                        <Meta title="Description:" description={repo.description} />
                    </Card>
                </Col>
                <Col span={16}>
                    {showLanguages()}
                    {showContributors()}
                </Col>
            </Row>
        </div>
    );
}