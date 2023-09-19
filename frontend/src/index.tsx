import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import App from "./App"
import ErrorPage from "./components/ErrorPage"
import PrivateRoute from "./components/PrivateRoute"
import "./index.css"
import reportWebVitals from "./reportWebVitals"

// admin dashboard routes
import ManageItem from "./routes/admin/ManageItem"
import ManageLoan from "./routes/admin/ManageLoan"
import ManageUser from "./routes/admin/ManageUser"

// common routes
import Dashboard, { NavLink } from "./routes/Dashboard"
import Home from "./routes/Home"
import Login from "./routes/Login"
import LoansApply from "./routes/user/LoansApply"
import LoanCardsAvailed from "./routes/user/LoanCardsAvailed"
import ItemsPurchased from "./routes/user/ItemsPurchased"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const userLinks: NavLink[] = [
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
]

const adminLinks: NavLink[] = [
  {
    displayName: "Customer Data Management",
    name: "manageUsers",
    to: "/admin/manageUsers",
  },
  {
    displayName: "Loan Card Management",
    name: "manageLoanCards",
    to: "/admin/manageLoanCards",
  },
  {
    displayName: "Items Master Data",
    name: "manageItems",
    to: "/admin/manageItems",
  },
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login/:role",
        element: <Login />,
      },
      {
        path: "user",
        element: <PrivateRoute component={() => <Outlet />} roles={["user"]} />,
        children: [
          {
            index: true,
            element: <Dashboard name="User Dashboard" navLinks={userLinks} />,
          },
          {
            path: "loans/view",
            element: <LoanCardsAvailed />,
          },
          {
            path: "loans/apply",
            element: <LoansApply />,
          },
          {
            path: "items",
            element: <ItemsPurchased />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute component={() => <Outlet />} roles={["admin"]} />
        ),
        children: [
          {
            index: true,
            element: <Dashboard name="Admin Dashboard" navLinks={adminLinks} />,
          },
          {
            path: "manageUsers",
            element: <ManageUser />,
          },
          {
            path: "manageLoanCards",
            element: <ManageLoan />,
          },
          {
            path: "manageItems",
            element: <ManageItem />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
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
