import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { Users } from "lucide-react";
import { deleteUser, fetchUsers } from "../../store/slices/usersSlice";

const ManageUsers = () => {
    const { user } = useSelector((state) => state.auth);
    // console.log(user);
  const { list } = useSelector((state) => state.users);

  const dispatch = useDispatch();


  if(user?.role === "Admin"){
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  }


  const handleRemoveUser = (userId) => {
    dispatch(deleteUser(userId));
    // console.log("Remove user with ID:", userId);
  };


  return (
   <div className="min-h-[100vh] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-auto">
      {/* Animated Background Lights */}
     
      <Navbar />

      {/* Main Content */}
      <div className="relative p-6 max-w-6xl mx-auto w-full ">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center space-x-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/30">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold mt-4 text-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Manage Users & Roles
          </h1>
          <p className="text-gray-400 text-sm mt-2 text-center max-w-md">
            View and manage all registered users. Assign roles and maintain access control.
          </p>
        </div>

        {/* User Cards Section */}
        {user?.role === "Admin"  ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
            {list.map((u) => (
              <div
                key={u._id}
                className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-md hover:shadow-gray-800/50 transition-all p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-100">
                    {u.name}
                  </h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      u.role === "Admin"
                        ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
                        : u.role === "Editor"
                        ? "bg-green-900/30 text-green-300 border border-green-800/50"
                        : "bg-gray-800/50 text-gray-300 border border-gray-700/50"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>

                <p className="text-sm text-gray-400">{u.email}</p>

                <div className="mt-4 border-t border-gray-800 pt-3 flex justify-end">
                  <button onClick={() => handleRemoveUser(u._id)} className="text-sm text-red-400 hover:text-red-300 font-medium transition">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center mt-10 underline ">
            Users only Show for Admin
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
