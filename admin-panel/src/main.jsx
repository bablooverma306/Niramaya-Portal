import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'   // 👈 apna store import karo
 
const routerBasename = import.meta.env.VITE_ROUTER_BASENAME || '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={routerBasename}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
console.log(store);
