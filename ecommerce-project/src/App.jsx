import { HomePage } from "./pages/HomePage"
import { Routes, Route } from "react-router";

function App(){
    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="checkout" element={} />
            </Routes>
        </>
    )
}