import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";

let router=createBrowserRouter([
    {
        path:"/",
        element:<Register></Register>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

export default router