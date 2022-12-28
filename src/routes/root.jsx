export default function Root() {
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
                    <ul>
                        <li>
                            <a href={"contacts/1"}>Your Card</a>
                        </li>
                        <li>
                            <a href={"contacts/2"}>Your Friend's Card</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id={"detail"} />
        </>
    )
}