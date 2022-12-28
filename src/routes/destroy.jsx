import {deleteContact} from "../contacts.js";
import {redirect} from "react-router-dom";

/**
 * This action is used to delete a contact.
 * It is not a default export because it is not a route component.
 * This is common practice for actions.
 * @param params URL parameters
 * @returns {Promise<Response>}
 */
export async function action({ params }) {
    await deleteContact(params.contactId);
    return redirect("/");
}
