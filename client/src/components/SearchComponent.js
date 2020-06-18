import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

const getRepository = (text,page) => {
  const reqPage=page>0?Math.ceil(page*10/30):1;
  const query=text?'q='+text+'+':'';
  return axios("https://api.github.com/search/repositories?q=stars:>0&"+query+"in:name&sort=stars&order=desc&page="+reqPage, {
    method: "GET",
    headers: {
      Authorization: "token fe9b07660dce9da2777b4f148ae8dd20f976f3aa",
    },
  }).then((res) => {
    const start = reqPage*3-page===2?0:reqPage*3-page===1?10:20;
    return [res.data.items.slice(start,start+10),res.data.total_count]
  });
};
const formPageArr= (curPage)=>{
  const arr=[];
  if(curPage==1)
    for(let i =curPage;i<curPage+10;i++){
      arr.push(i);
    }
  else{
    for(let i =curPage-1;i<curPage+9;i++){
      arr.push(i);
    }
  }
  return arr;
}
const RepoItem = ({item}) => {
  
  return (
    <tr className="row">
      <td className="repo-name">{item.name}</td>
      <td className="stars">{item.stars}</td>
      <td className="last-commit">{item.lastCommitDate}</td>
      <Link to={'/repos/'+item.link}><td className="link">{item.url}</td></Link>
    </tr>
  );
};
export const SearchComponent = function () {
  const [loading, setLoading] = useState(true)
  const [value, changeValue] = useState("");
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const refetch = async () => {
    const result = await getRepository(value,page);
    const receivedList = result[0].map((a) => {
      return {
        name: a.name,
        stars: a.stargazers_count,
        lastCommitDate: a.pushed_at.slice(0,10),
        url: a.html_url,
        link:a.full_name
      };
    });
    setList(receivedList);
    setLoading(false)
  };
  useEffect(() => void refetch(), [value,page]);
  if(loading){
    return (<h2>Loading...</h2>);
  }
  return (
    <div>
      <input
        id="search"
        onChange={(e) =>changeValue(e.target.value)}
        placeholder="Search"
      />
      <table>
        <thead>
          <tr>
            <th className="repo-name">Name</th>
            <th className="stars">Stars</th>
            <th className="last-commit">Last commit date</th>
            <th className="link">URL</th>
          </tr>
        </thead>
        <tbody>
          {list.map((a) => <RepoItem item={a}/>)}
        </tbody>
      </table>
      {formPageArr(page).map((a)=>{
        return(
          <button key={a} className='page-number' onClick={()=>{setPage(a)}}>
            {a}
          </button>
        );
      })
      }
    </div>
  );
}
