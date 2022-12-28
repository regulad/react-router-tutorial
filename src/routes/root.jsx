import {Link, Outlet, useLoaderData} from "react-router-dom";
import {getContacts} from "../contacts.js";

export async function loader() {
    /**
     * This method must be exported and named "loader" for use with the router.
     */
    const contacts = await getContacts();
    return { contacts };
}

export default function Root() {
    const { contacts } = useLoaderData();
    // We must use this hook to access the data returned by the loader.

    return (
        <>
            <div id={"sidebar"}>
                <h1>Regulad's React Router Contacts</h1>
                <div>
                    <form id={"search-form"} role={"search"}>
                        <input
                            id={"q"} // query?
                            aria-label={"Search contacts"}
                            placeholder={"Search for..."}
                            type={"search"}
                            name={"q"} // also query
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
                    </form>
                    <form method={"post"}>
                        <button type={"submit"}>
                            Add new contact...
                        </button>
                    </form>
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
                                                <Link to={`contacts/${contact.id}`}>
                                                    {/* Links are like any other element, so we can use them like this with children */}
                                                    {
                                                        contact.first || contact.last
                                                            ? <>{contact.first} {contact.last}</>
                                                            : <i>Unknown or No name</i>
                                                    }
                                                          {" " /* This space is a gap between title and the favorite star (not a button) */}
                                                          {contact.favorite && <span>★</span>}
                                                      </Link>
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

            <div id={"detail"}>
                <Outlet />
                {/* The child componenet will be rendered here. */}
                {/* If there is no child component, nothing will be rendered here. */}
            </div>
        </>
    )
}