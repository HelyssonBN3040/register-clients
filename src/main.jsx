import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//Configuração de rotas
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom"
//Pagina de Erro
import ErrorPage from './Pages/Error/ErrorPage.jsx'
import DataTablePage from './Pages/DataTable/DataTablePage.jsx'
import LoginPage from './Pages/Login/LoginPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataTablePage/> ,
    errorElement: <ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
