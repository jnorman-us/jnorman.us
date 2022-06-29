import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./app";

import './styles/index.css';
import FirebaseProvider from "./firebase/provider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <FirebaseProvider>
            <App />
        </FirebaseProvider>
    </BrowserRouter>
);
