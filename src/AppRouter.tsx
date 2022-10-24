import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AmazonList} from "./Features/Amazon/AmazonList";
import {AmazonProductPage} from "./Features/Amazon/AmazonProductPage";

export function AppRouter() {
    return (
        <Routes>
            <Route path={"/"} element={<AmazonList/>}/>
            <Route path={"/amazon/product/:id"} element={<AmazonProductPage/>}/>
        </Routes>
    )
}