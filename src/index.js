import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'
import Topbar from 'pages/components/topbar'
import { CurrentUserProvider } from 'contexts/currentUser'

const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <Topbar />
        <Routes />
      </Router>
    </CurrentUserProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
