import {Form, NavLink, Outlet, redirect, useLoaderData, useNavigation} from "react-router-dom";
import {createContact, getContacts} from "../contacts.js";
import {useEffect} from "react";

export async function action() {
    /**
     * This method must be called action, as it is the action that occurs when
     * a POST request is made to the root page.
     * I would assume that hooks work here?
     */
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
    // asks user to edit & populate contact after creation
}

export async function loader({ request }) {
    /**
     * This method must be exported and named "loader" for use with the router.
     */
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const contacts = await getContacts(query);
    return { contacts, query };
}

export default function Root() {
    const { contacts, query } = useLoaderData();
    // We must use this hook to access the data returned by the loader.
    const navigation = useNavigation();

    useEffect(() => {
        document.getElementById("q").value = q;
    }); // magic!

    return (
        <>
            <div id={"sidebar"}>
                <h1>Regulad's React Router Contacts</h1>
                <div>
                    <Form id={"search-form"} role={"search"}>
                        <input
                            id={"q"} // query?
                            aria-label={"Search contacts"}
                            placeholder={"Search for..."}
                            type={"search"}
                            name={"q"} // also query
                            defaultValue={query}
                        />
                        <div
                            id={"search-spinner"}
                            // when visible, this spins to represent a page loading
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className={"sr-only"}
                            aria-live={"polite"}
                        />
                    </Form>
                    <Form method={"post"}>
                        {/*
                            This form is used to create a new contact.
                            It will send a "client-side POST request" to the root page.
                            Since this method uses the useLoaderData hook, it will rerender.
                        */}
                        <button type={"submit"}>
                            New...
                        </button>
                    </Form>
                </div>
                <nav>
                    {
                        contacts.length
                            ? (
                                // In a real program, I would use more componenets and abstract on a higher level.
                                // This is messy.
                                <ul>
                                    {/* We use links here to avoid reloading the page */}
                                    {/* Additionally, a 404 will instead just not do anything */}
                                    {
                                    contacts.map(
                                        (contact) => (
                                            /* the contact is the same type as before */
                                            <li key={contact.id}>
                                                <NavLink
                                                    to={`contacts/${contact.id}`}
                                                    className={({ isActive, isPending }) =>
                                                        isActive
                                                            ? "active"
                                                            : isPending
                                                                ? "pending"
                                                                : ""
                                                    }
                                                > {/* NavLinks can have special classNames */}
                                                    {/* Links are like any other element, so we can use them like this with children */}
                                                    {
                                                        contact.first || contact.last
                                                            ? <>{contact.first} {contact.last}</>
                                                            : <i>Unknown or No name</i>
                                                    }
                                                          {" " /* This space is a gap between title and the favorite star (not a button) */}
                                                          {contact.favorite && <span>★</span>}
                                                      </NavLink>
                                                  </li>
                                              )
                                          )
                                      }
                                  </ul>
                            )
                            : (
                                <p>
                                    <i>No contacts found.</i>
                                </p>
                            )
                    }
                </nav>
            </div>

            <div
                id={"detail"}
                className={
                    navigation.state === "loading" ? "loading" : ""
                }
                // navigation.state could be used for a loading bar or any other animation
            >
                <Outlet />
                {/* The child component will be rendered here. */}
                {/* If there is no child component, nothing will be rendered here. */}
            </div>
        </>
    )
}