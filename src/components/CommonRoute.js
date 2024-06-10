import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Tui from "../pages/Tui";
import Ck from "../pages/Ck";
import Quill from "../pages/Quill";

function CommonRoute() {
    return (
        <>
        <Routes>            
            <Route path="/" element={<Main/>} />
            <Route path="/tui" element={<Tui/>} />
            <Route path="/ck" element={<Ck/>} />
            <Route path="/quill" element={<Quill/>} />
        </Routes>
        </>
    )
}

export default CommonRoute;