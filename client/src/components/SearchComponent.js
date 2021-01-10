import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { Input, Table, Pagination} from 'antd';

const {Search} = Input;

const getRepositories = (text,page) => {
  //API возвращает по 30 реп на страницу, отрисовывается 10 реп на страницу
  const reqPage=page>3?Math.ceil(page*10/30):1;
  const query=text?'q='+text+'+':'';
  return axios("https://api.github.com/search/repositories?q=stars:>0&"+query+"in:name&sort=stars&order=desc&page="+reqPage, {
    method: "GET",
    headers: {
      Authorization: "token fe9b07660dce9da2777b4f148ae8dd20f976f3aa",
    },
  }).then((res) => {
    //Выбираем из 30 возвращённых реп 10 нужных
    const start = reqPage*3-page===2?0:reqPage*3-page===1?10:20;
    return [res.data.items.slice(start,start+10),res.data.total_count]
  });
};

export const SearchComponent = function () {
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState("");
  const [repos, setRepos] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);
  const [lastRepoNum, setLastRepoNum]= useState(1000);
  const columns=[
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, row, index) => <Link to={'/repos/'+repos[index].link}>{text}</Link>,
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
    },
    {
      title: 'Last commit date',
      dataIndex: 'lastCommitDate',
      key: 'lastCommitDate',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: url => <a target='blank' href= {url}>{url}</a>
    },
  ]
  const refetch = async () => {
    //Получаем репозитории
    const result = await getRepositories(searchText,curentPage);
    //Оставляем только нужные данные
    const receivedList = result[0].map((a) => {
      return {
        name: a.name,
        stars: a.stargazers_count,
        lastCommitDate: a.pushed_at.slice(0,10),
        url: a.html_url,
        link:a.full_name
      };
    });
    setRepos(receivedList);
    //Так как API выдаёт только первые 1000 реп, обрезаем лишние
    if(result[1]>=1000){
      setLastRepoNum(1000);
    }else{
      setLastRepoNum(result[1]);
    }
    setLoading(false);
  };

  useEffect(() => void refetch(), [searchText,curentPage]);
  if(loading){
    return (<h2>Loading...</h2>);
  }
  return(
    <div>
      <Search style={{width:'50%', margin:'30px 25%'}} placeholder="input search text" onSearch={(value)=>setSearchText(value)} enterButton />
      <Table pagination={false} dataSource={repos} columns={columns} />
      <Pagination className='pagination' showQuickJumper defaultCurrent={1} total={lastRepoNum} onChange={(page)=>{setCurrentPage(page)}} />
    </div>
  );
}
