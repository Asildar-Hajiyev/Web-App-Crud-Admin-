import { Route, Routes } from "react-router-dom"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Home from "../pages/Home"
import Login from "../Auth/Login"
import AdminRouter from "../admin/routes/AdminRouter"

function AppRouter() {
  return (
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/admin/*" element={<AdminRouter/>} />
    </Routes>
  )
}

export default AppRouter
