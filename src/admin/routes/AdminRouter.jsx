import { Route, Routes } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import Dashboard from "../pages/Dashboard"
import Orders from "../pages/Orders"
import Users from "../pages/Users"
import Settings from "../pages/Settings "

function AdminRouter() {
  return (
     <Routes>
      <Route element={<AdminLayout/>}>
        <Route index element={<Dashboard/>} />
        <Route path="orders"  element={<Orders/>} />
        <Route path="users"  element={<Users/>} />
        <Route path="settings" element={<Settings/>} />
      </Route>
    </Routes>
  )
}

export default AdminRouter
