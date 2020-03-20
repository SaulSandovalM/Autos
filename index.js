import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const WithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const ReduxProvider = () => (
  <Provider store={store}>
    <WithRouter/>
  </Provider>
);

ReactDOM.render(<ReduxProvider />, document.getElementById('root'));
serviceWorker.unregister();
