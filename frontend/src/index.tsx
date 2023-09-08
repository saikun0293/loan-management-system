import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Login from "./routes/Login";
import { loginUserWithEmailAndPassword } from "./api/user";
import Dashboard from "./routes/user/Dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "user",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <Dashboard
                name="User Dashboard"
                navLinks={[
                  {
                    displayName: "View Loans",
                    name: "viewLoans",
                    to: "/user/loans/view",
                  },
                  {
                    displayName: "Apply for a loan",
                    name: "applyLoans",
                    to: "/user/loans/apply",
                  },
                  {
                    displayName: "Items Purchased",
                    name: "itemsPurchased",
                    to: "/user/items",
                  },
                ]}
              />
            ),
          },
          {
            path: "login",
            element: (
              <Login
                name="User Login"
                onLogin={loginUserWithEmailAndPassword}
              />
            ),
          },
          {
            path: "loans/view",
            element: <div>View Loans</div>,
          },
          {
            path: "loans/apply",
            element: <div>Apply for Loans</div>,
          },
          {
            path: "items",
            element: <div>Items Purchased</div>,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
