import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";

function AdminHeader() {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Uğurla çıxış etdiniz!");
    navigate("/login");
  };
  const tabs = [
    { label: "Dashboard", path: "/admin" },
    { label: "Sifarişlər", path: "/admin/orders" },
    { label: "İstifadəçilər", path: "/admin/users" },
  ];
  const userEmail = user?.email || "admin@admin";
  return (
    <>
      <header className="h-16 bg-white border-b border-gray-100 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Menubar */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Menyu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            Admin Panel
          </h1>
        </div>

        {/* Profil */}
        <div
          className="relative pl-2 sm:pl-4 border-l border-gray-100"
          ref={menuRef}
        >
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm shrink-0">
              A
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 leading-none">
                Admin
              </p>

              <p className="text-xs text-gray-400 mt-1">
                admin@admin
              </p>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-20">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Profilə keç
              </button>

              <hr className="my-1 border-gray-100" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Çıxış
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 max-w-[80%] bg-white shadow-xl z-30 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <span className="font-semibold text-gray-900">
            Admin Panel
          </span>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Bağla"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-2">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              type="button"
              onClick={() => {
                setSidebarOpen(false);
                navigate(tab.path);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default AdminHeader;