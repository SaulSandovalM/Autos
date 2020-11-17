import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import configureStore from './store/configureStore'
import { ThemeProvider } from 'styled-components'
import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import { theme } from './Theme'

const store = configureStore()

function Routes () {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Nav />
          <App />
          <Footer />
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default Routes
