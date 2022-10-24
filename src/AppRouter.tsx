import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AmazonList} from "./Features/Amazon/AmazonList";

export function AppRouter() {
    return (
        <Routes>
            <Route path={"/"} element={<AmazonList/>}/>
        </Routes>
    )
}