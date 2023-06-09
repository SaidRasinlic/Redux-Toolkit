import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { fetchUsers } from './features/users/usersSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchUsers());

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode >,
);
