import { Routes, Route } from "react-router-dom";
import Feed from "../pages/Feed";
import ViewPosts from "../pages/user/ViewPosts";
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import ManageUsers from "../pages/admin/ManageUsers";
import ManagePosts from "../pages/editor/ManagePosts";


const Layout = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Feed />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/viewposts"
        element={
         
            <ViewPosts />
         
        }
      />
      <Route
        path="/admin/users"
        element={
        
            <ManageUsers />
        
        }
      />
      <Route
        path="/editor/posts"
        element={
         
            <ManagePosts />
          
        }
      />
    </Routes>
  );
};

export default Layout;
