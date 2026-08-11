import { useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import AppRouter from "./provider/AppRouter"

function App() {
    const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  return (
    <div>
       {!isAdmin && <Header/>}
      <AppRouter/>
      {!isAdmin && <Footer/>}
      
    </div>
  )
}

export default App
