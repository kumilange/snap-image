import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Main from './components/Main'
import ImageView from './containers/ImageView'

export default
<Route path = "/" component = {App}>
  <IndexRoute component = {Main} />
  <Route path="/image/:id" component={ImageView} />
</Route>