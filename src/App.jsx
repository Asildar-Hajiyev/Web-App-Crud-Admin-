import { useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import AppRouter from "./provider/AppRouter"
import { ToastContainer } from "react-toastify"

function App() {
    const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  return (
    <div>
       {!isAdmin && <Header/>}
      <AppRouter/>
      {!isAdmin && <Footer/>}
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
