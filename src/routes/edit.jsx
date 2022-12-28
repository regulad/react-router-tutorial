import {Form, redirect, useLoaderData} from "react-router-dom";
import {updateContact} from "../contacts.js";

export async function action({ request, params }) {
    /**
     * we can use request and params here to receive the
     * two respective pieces of data
     */
    const formData = await request.formData();
    const updates = Object.fromEntries(formData); // not familiar with this
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
    // Redirect is a Response object that we are returning.
    // The browser uses the Response object to figure out how to respond to the request.
}

export default function EditContact() {
    const contact = useLoaderData();
    // since this uses the same loader as contact it will receive the same data

    return (
        <Form
            method={"post"}
            id={"contact-form"}
        >
            <p>
                <span>Name</span>
                <input
                    placeholder={"Given name"}
                    aria-label={"Given name"}
                    type={"text"}
                    name={"first"}
                    defaultValue={contact.first}
                />
                <input
                    placeholder={"Family name"}
                    aria-label={"Family name"}
                    type={"text"}
                    name={"last"}
                    defaultValue={contact.last}
                />
            </p>

            <label>
                <span>Twitter</span>
                <input
                    type={"text"}
                    name={"twitter"}
                    placeholder={"username"}
                    defaultValue={contact.twitter}
                />
            </label>

            <label>
                <span>Avatar URL</span>
                <input
                    placeholder={"https://example.com/avatar.jpg"}
                    aria-label={"Avatar URL"}
                    type={"text"} // not url oddly
                    name={"avatar"}
                    defaultValue={contact.avatar}
                />
            </label>

            <label>
                <span>Notes</span>
                <textarea // we use this textarea instead of input for multiline text
                    name={"notes"}
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>

            <p>
                <button type={"submit"}>Save</button>
                <button type={"button"}>Cancel</button>
            </p>
        </Form>
    );
}