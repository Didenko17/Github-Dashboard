import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import {AppRedirect} from './components/AppRedirect';
import {Link} from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';



const { Header, Content, Footer } = Layout;

function App() {
  return (

    <div className="App">
      <Layout className="layout">
      <Header>
      <Link className='logo' to='/'>Github Dashboard</Link>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <AppRedirect/>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  );
}
export default App;
