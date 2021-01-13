import React from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'antd'

export const Login = ()=>{
    return <a href='https://github.com/login/oauth/authorize?client_id=502342aaf5a3bf435d7e&redirect_uri=http://localhost:3000/callback'><Button id='login-button' type='primary'>Log in with GitHub</Button></a>
}