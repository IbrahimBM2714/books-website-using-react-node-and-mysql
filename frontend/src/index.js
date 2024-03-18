import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Books/>
  },
  {
    path: "/Add",
    element: <Add/>
  },
  {
    path: "/Update/:id",
    element: <Update/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
