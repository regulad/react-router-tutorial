import {Form, useLoaderData} from "react-router-dom";
import {getContact} from "../contacts.js";


export async function loader({ params }) {
    /**
     * This method must be exported and named "loader" for use with the router.
     */
    return await getContact(params.contactId);
    // If we used brackets here, it would make an object that had {contact: Object (contact)}
    // I assume that I autocompleted it from Copilot and that Copilot got it from an action
}


function Favorite({ contact }) {
    let favorite = contact.favorite;
    return (
        <Form method={"post"}>
            <button
                name={"favorite"}
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}

export default function Contact() {
    const contact = useLoaderData();
    // We must use this hook to access the data returned by the loader.
    // This will also make it rerender when the url param and therefore the data changes.

    return (
        <div id={"contact"}>
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                {/* Header */}
                <h1>
                    {
                        contact.first || contact.last
                            ? <>{contact.first} {contact.last}</>
                            : <i>Unknown or No name</i>
                    }
                    {" "}
                    {/* This space is a gap between title and the favorite button */}
                    <Favorite contact={contact} />
                </h1>

                {/* Twitter */}
                {
                    contact.twitter && (
                        <p>
                            <a
                                href={`https://twitter.com/${contact.twitter}`}
                                target={"_blank"}
                                >
                                @{contact.twitter}
                            </a>
                        </p>
                    )
                }

                {/* Notes */}
                {contact.notes && <p>{contact.notes}</p>}

                {/* Edit forms */}
                <div>
                    <Form action={"edit"}>
                        <button type={"submit"}>Edit</button>
                    </Form>
                    <Form
                        method={"post"}
                        action={"destroy"}
                        onSubmit={
                            (event) => {
                                if (!confirm("Are you sure?")) {
                                    event.preventDefault();
                                }
                            }
                        }
                    >
                        <button type={"submit"}>Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}