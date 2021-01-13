import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {AppRedirect} from './components/AppRedirect';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';



const { Header, Content, Footer } = Layout;

function App() {
  return (

    <div className="App">
      <Layout className="layout">
        <Header>
          <Link className='logo' to='/'>Github Dashboard</Link>
        </Header>
        <Content style={{ padding: '0 50px' }}>
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
