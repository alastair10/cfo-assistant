import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App';
import '@/index.css';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";


// Redux Store is the main, central bucket which stores all the states of the app
export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer }, 
  middleware: (getDefault) => getDefault().concat(api.middleware), // configuration needed for api call for redux toolkit query to work
})

setupListeners(store.dispatch); // configuration needed for api call, to help redux toolkit query work


// <Provider> component makes the Redux store available to any nested components that need to access the store
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
