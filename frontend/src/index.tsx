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
import ItemsPurchased from "./routes/user/ItemsPurchased"
import LoanCardsAvailed from "./routes/user/LoanCardsAvailed"
import LoansApply from "./routes/user/LoansApply"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const employeeLinks: NavLink[] = [
  {
    displayName: "View Loans",
    name: "viewLoans",
    to: "/employee/loans/view",
  },
  {
    displayName: "Apply for a loan",
    name: "applyLoans",
    to: "/employee/loans/apply",
  },
  {
    displayName: "Items Purchased",
    name: "itemsPurchased",
    to: "/employee/items",
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
        path: "login",
        element: <Login />,
      },
      {
        path: "employee",
        element: (
          <PrivateRoute component={() => <Outlet />} roles={["EMPLOYEE"]} />
        ),
        children: [
          {
            index: true,
            element: (
              <Dashboard name="User Dashboard" navLinks={employeeLinks} />
            ),
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
          <PrivateRoute component={() => <Outlet />} roles={["ADMIN"]} />
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

root.render(<RouterProvider router={router} />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
