import {Form, useFetcher, useLoaderData} from "react-router-dom";
import {getContact, updateContact} from "../contacts.js";


export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

/**
 * This method must be exported and named "loader" for use with the router.
 */
export async function loader({ params }) {
    const contact = await getContact(params.contactId)
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Contact not found",
        });
    }
    return contact;
    // If we used brackets here, it would make an object that had {contact: Object (contact)}
    // I assume that I autocompleted it from Copilot and that Copilot got it from an action
}


function Favorite({ contact }) {
    // fetcher, different from navigatior
    // lets us run operations without page changing, even client side
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    if (fetcher.formData) {
        // this is "optimistic" because it doesn't wait for the "backend" to repsond
        favorite = fetcher.formData.get("favorite") === "true";
    }

    return (
        <fetcher.Form method={"post"}>
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
        </fetcher.Form>
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
                        action={"destroy"}  // this will post to /contacts/:contactId/destroy on submit
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