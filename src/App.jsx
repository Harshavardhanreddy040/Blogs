import React from 'react'

import "./App.css"
import Register from './Pages/Register.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.jsx'
import Login from './Pages/login.jsx'

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    {/* <Login></Login> */}
      {/* <Register></Register> */}
    </>
  )
}

export default App