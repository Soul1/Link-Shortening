import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Links from './pages/Links'
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Auth from "./pages/Auth";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/links'>
          <Links/>
        </Route>
        <Route exact path='/create'>
          <Create/>
        </Route>
        <Route path='/detail/:id'>
          <Detail/>
        </Route>
        <Redirect to='create'/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route exact path='/'>
        <Auth/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  )
};