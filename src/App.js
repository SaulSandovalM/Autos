import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
import Login from './components/login/Login'
import TablaPachuca from './components/tables/TablaPachuca'
import Table from './components/impresion/Table'
import Home from './components/home/Home'

function App (props) {
  const { isAuthenticated, isVerifying } = props
  return (
    <Switch>
      <Route path='/Login' component={Login} />
      <ProtectedRoute
        exact
        path='/Citas'
        component={TablaPachuca}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/CitasImpresion'
        component={Table}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path='/' component={Home} />
    </Switch>
  )
}
function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
