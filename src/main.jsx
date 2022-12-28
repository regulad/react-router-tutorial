import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import './index.css'
import Root, {action as rootAction, loader as rootLoader} from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Contact, {action as contactAction, loader as contactLoader} from "./routes/contact.jsx";
import EditContact, {action as editAction} from "./routes/edit.jsx";
import {action as destroyAction} from "./routes/destroy.jsx";
import Index from "./routes/index.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root/>}
            loader={rootLoader}
            action={rootAction}
            errorElement={<ErrorPage/>}
        >
            <Route errorElement={<ErrorPage/>}>
                <Route index element={<Index/>}/>
                <Route
                    path="contacts/:contactId"
                    element={<Contact/>}
                    loader={contactLoader}
                    action={contactAction}
                />
                <Route
                    path="contacts/:contactId/edit"
                    element={<EditContact/>}
                    loader={contactLoader}
                    action={editAction}
                />
                <Route
                    path="contacts/:contactId/destroy"
                    action={destroyAction}
                />
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
