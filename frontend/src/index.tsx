import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import { loginUserWithEmailAndPassword } from "./api/user"
import App from "./App"
import ErrorPage from "./components/ErrorPage"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import Login from "./routes/Login"
import Dashboard, { NavLink } from "./routes/user/Dashboard"
import Home from "./routes/user/Home"
import PrivateRoute from "./components/PrivateRoute"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const userLinks: NavLink[] = [
  {
    displayName: "View Loans",
    name: "viewLoans",
    to: "/user/loans/view"
  },
  {
    displayName: "Apply for a loan",
    name: "applyLoans",
    to: "/user/loans/apply"
  },
  {
    displayName: "Items Purchased",
    name: "itemsPurchased",
    to: "/user/items"
  }
]

const adminLinks: NavLink[] = [
  {
    displayName: "View Loans",
    name: "viewLoans",
    to: "/user/loans/view"
  },
  {
    displayName: "Apply for a loan",
    name: "applyLoans",
    to: "/user/loans/apply"
  },
  {
    displayName: "Items Purchased",
    name: "itemsPurchased",
    to: "/user/items"
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "user",
        element: <PrivateRoute component={<div />} />,
        children: [
          {
            index: true,
            element: <Dashboard name="User Dashboard" navLinks={userLinks} />
          },
          {
            path: "login",
            element: (
              <Login
                name="User Login"
                onLogin={loginUserWithEmailAndPassword}
              />
            )
          },
          {
            path: "loans/view",
            element: <div>View Loans</div>
          },
          {
            path: "loans/apply",
            element: <div>Apply for Loans</div>
          },
          {
            path: "items",
            element: <div>Items Purchased</div>
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
