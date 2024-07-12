import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/LoginSignUpTW/SignIn";
import SignUp from "./components/LoginSignUpTW/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashHome from "./components/Dashboard/DashHome";
import BrowseBooks from "./components/BrowseBooks/BrowseBooks";
import Thesis from "./components/Thesis/Thesis";
import AllBooks from "./components/Books/AllBooks";
import BorrowReq from "./components/Books/BorrowReq";
import BorrowedBooks from "./components/Books/BorrowedBooks";
import AddNewBook from "./components/Books/AddNewBook";
import ViewBook from "./components/Books/ViewBook";
import AllUsers from "./components/Users/AllUsers";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp /> } />
        <Route path="/BrowseBooks" element={<BrowseBooks /> } />
        <Route path="/Dashboard/" element={<PrivateRoute ProtectRoute={<Dashboard /> }/> } >
          <Route path="Home" element={<PrivateRoute ProtectRoute={<DashHome /> } /> } />
          <Route path="AllBooks" element={<PrivateRoute ProtectRoute={<AllBooks />} /> } />
          <Route path="BorrowReq" element={<PrivateRoute ProtectRoute={<BorrowReq /> } /> } />
          <Route path="BorrowedBooks" element={<PrivateRoute ProtectRoute={<BorrowedBooks />} /> } />
          <Route path="AddNewBook" element={<PrivateRoute ProtectRoute={<AddNewBook /> } /> } />
          <Route path="Thesis" element={<PrivateRoute ProtectRoute={<Thesis /> } /> } />
          <Route path="AllUsers" element={<PrivateRoute ProtectRoute={<AllUsers /> } /> } />
          <Route path="ViewBook/:id" element={<PrivateRoute ProtectRoute={<ViewBook /> } /> } />
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}