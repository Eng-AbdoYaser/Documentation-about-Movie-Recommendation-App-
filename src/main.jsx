import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import App from "./App";
import'./index.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter } from "react-router-dom";

createRoot(document.querySelector("#root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)