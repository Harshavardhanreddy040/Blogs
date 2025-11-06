import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register";

let router=createBrowserRouter([
    {
        path:"/",
        element:<Register></Register>
    }
])

export default router