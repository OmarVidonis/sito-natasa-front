import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home.jsx'
import Cities from './pages/Cities.jsx'
import SingolaCard from './pages/SingolaCard.jsx'
import CitiesChildren from './pages/CitiesChildren.jsx'
import SingolaCardChildren from './pages/SingolaCardChildren.jsx'
import MapFull from './pages/MapFull.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/map",
    element: <MapFull></MapFull>,
  },
  {
    path: "/cities",
    element: <Cities></Cities>,
  },
  {
    path: "/cities/:cardName",
    element: <SingolaCard></SingolaCard>,
  },
  {
    path: "/cities-children",
    element: <CitiesChildren></CitiesChildren>,
    children: [
      {
        path: ":cardId",
        element: <SingolaCardChildren></SingolaCardChildren>
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <RouterProvider router={router}></RouterProvider>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
)
