import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/LoginSignUpTW/SignIn";
import SignUp from "./components/LoginSignUpTW/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashHome from "./components/Dashboard/DashHome";
import BrowseBooks from "./components/BrowseBooks/BrowseBooks";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp /> } />
        <Route path="/BrowseBooks" element={<BrowseBooks /> } />
        <Route path="/Dashboard/" element={<PrivateRoute ProtectRoute={<Dashboard /> }/> } >
          <Route path="Home" element={<PrivateRoute ProtectRoute={<DashHome /> } /> } />
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}