import { Form } from "react-router-dom";

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
    const contact = {
        first: "Given Name",
        last: "Family Name",
        avatar: "https://placekitten.com/g/200/200", // can be undefined
        twitter: "dinsaur1969",
        notes: "This is a note about the contact.",
        favorite: true,
    }

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