import { Route, Routes } from "react-router-dom"
import AdminLayout from "../layout/AdminLayout"
import Dashboard from "../pages/Dashboard"

function AdminRouter() {
  return (
     <Routes>
      <Route element={<AdminLayout/>}>
        <Route index element={<Dashboard/>} />
      </Route>
    </Routes>
  )
}

export default AdminRouter
