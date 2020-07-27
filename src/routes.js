import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from 'pages/globalFeed'
import Article from 'pages/article'
import Login from 'pages/login'
import Register from 'pages/register'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Register} />
    </Switch>
  )
}

export default Routes
