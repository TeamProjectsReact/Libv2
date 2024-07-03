import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/LoginSignUpTW/SignIn";
import SignUp from "./components/LoginSignUpTW/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashHome from "./components/Dashboard/DashHome";
import BrowseBooks from "./components/BrowseBooks/BrowseBooks";
import Books from "./components/Books/Books";
import Thesis from "./components/Thesis/Thesis";
import Users from "./components/Users/Users";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp /> } />
        <Route path="/BrowseBooks" element={<BrowseBooks /> } />
        <Route path="/Dashboard/" element={<PrivateRoute ProtectRoute={<Dashboard /> }/> } >
          <Route path="Home" element={<PrivateRoute ProtectRoute={<DashHome /> } /> } />
          <Route path="Books" element={<PrivateRoute ProtectRoute={<Books /> } /> } />
          <Route path="Thesis" element={<PrivateRoute ProtectRoute={<Thesis /> } /> } />
          <Route path="Users" element={<PrivateRoute ProtectRoute={<Users /> } /> } />
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}