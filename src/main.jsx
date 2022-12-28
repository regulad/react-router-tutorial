import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import Root, { loader as rootLoader } from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Contact from "./routes/contact.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        // this will be the only element rendered on root page
        errorElement: <ErrorPage />,
        // this is the error page for anything on the ROOT page
        // if an error is on otherpage/whatever, it will be handled instead by that error handler
        loader: rootLoader,
        // this is the loader for the root page, it will be run when navigated to
        children: [
            {
                // since this is a child of /, it inherits the error handler
                path: 'contacts/:contactId',
                // IMPORTANT: don't use a leading slash here
                // this is a dynamic route, and contactId can be accessed in the component using TODO
                element: <Contact />
                // without an Outlet, this element will not be rendered anywhere
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
