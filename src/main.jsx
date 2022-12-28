import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'
import Root, { loader as rootLoader, action as rootAction } from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact.jsx";
import EditContact, { action as editAction } from "./routes/edit.jsx";
import { action as destroyAction } from "./routes/destroy.jsx";
import Index from "./routes/index.jsx";

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
        action: rootAction,
        // this action will get caused when a POST request is made to the root page
        children: [
            {
                // we use index and not {path: ""}
                // for an **exact** match case since the parent is a root
                index: true,
                element: <Index />
            },
            {
                // since this is a child of /, it inherits the error handler
                path: 'contacts/:contactId',
                // IMPORTANT: don't use a leading slash here
                // this is a dynamic route, and contactId can be accessed in the component using
                // params.contactId inside the loader
                element: <Contact />,
                // without an Outlet, this element will not be rendered anywhere
                loader: contactLoader,
                action: contactAction,
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                // in practice, each element should have its own loader.
                loader: contactLoader,
                action: editAction
            },
            {
                path: "contacts/:contactId/destroy",
                action: destroyAction
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
