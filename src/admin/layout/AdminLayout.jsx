import { Outlet } from "react-router-dom"
import AdminHeader from "../components/AdminHeader"

function AdminLayout() {
  return (
    <div>
      <AdminHeader/>
      <main className="p-6">
        <Outlet/> 
      </main>
    </div>
  )
}

export default AdminLayout
