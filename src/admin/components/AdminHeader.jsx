import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AdminHeader() {
   const navigate = useNavigate()

  const handleLogout = () => {
   try {
     localStorage.removeItem("token")
    toast.success("Uğurla çıxış edildi")
    navigate("/login")
   } catch (error) {
    toast.error(error.message,"Çıxıs alınmadı")
   }
  }
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10">

      <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>

      <div className="flex items-center gap-4">

        {/* Bildirişlər */}
        <button
          type="button"
          className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors"
          aria-label="Bildirişlər"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 leading-none">Admin</p>
            <p className="text-xs text-gray-400 mt-1">admin@example.com</p>
          </div>
        </div>

        {/* Çıxış */}
        <button
          onClick={handleLogout}
          type="button"
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Çıxış"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

      </div>
    </header>
  )
}

export default AdminHeader
