import { Link } from "react-router-dom";

function Main() {
    return (
        <>
        <Link to="/tui">TOAST UI Editor</Link> |&nbsp;
        <Link to="/ck">CKEditor</Link> |&nbsp;
        <Link to="/quill">Quill</Link>
        </>
    )
}

export default Main;