import React from 'react'
import { Route, Switch} from 'react-router-dom';
import {SearchComponent} from './SearchComponent';
import{RepoCardComponent} from './RepoCardComponent';
export const AppRedirect= ()=>(
    <Switch>
      <Route exact component={RepoCardComponent}  path='/repos/:repoOwner/:repoName'/>
      <Route component={SearchComponent} path='/'/>
    </Switch>
);