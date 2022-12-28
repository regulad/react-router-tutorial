import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import Root from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Contact from "./routes/contact.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        // this will be the only element rendered on root page
        errorElement: <ErrorPage />
        // this is the error page for anything on the website since it is on root
    },
    {
        path: '/contacts/:contactId',
        // this is a dynamic route, and contactId can be accessed in the component using TODO
        element: <Contact />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
