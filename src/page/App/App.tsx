import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Login from "../Login/Login.tsx";
import Register from "../Login/Register.tsx";
import $404 from "../404/404.tsx";
import NovelPage from "../Novel/NovelPage.tsx";

const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '/register',
            element: <Register/>,
        },
        {
            path: '/novel/:novelId',
            element: <NovelPage/>,
        },
        {
            path: '*',
            element:
                <$404/>,
        }
    ])
;

const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
