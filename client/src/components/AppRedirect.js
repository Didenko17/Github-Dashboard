import React from 'react'
import { Route, Switch} from 'react-router-dom';
import {SearchComponent} from './SearchComponent';
import{RepoCardComponent} from './RepoCardComponent';
import {Login} from './Login'
import { Callback } from './Callback';
export const AppRedirect= ()=>(
    <Switch>
      <Route exact component={RepoCardComponent}  path='/repos/:repoOwner/:repoName'/>
      <Route exact component={Login} path='/'/>
      <Route component={Callback} path='/callback'/>
      <Route component={SearchComponent} path='/search'/>
    </Switch>
);