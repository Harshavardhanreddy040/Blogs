import React from 'react'

import "./App.css"
import Register from './Pages/Register.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.jsx'

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App