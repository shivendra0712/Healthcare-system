import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { FileText } from "lucide-react";
import { fetchPosts } from "../../store/slices/postsSlice";

const ViewPosts = () => {

   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { list } = useSelector((state) => state.posts);
   

     useEffect(() => {
      dispatch(fetchPosts());
    }, []);

  return (
   <div className="min-h-[100vh] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-auto">
      {/* Animated Background Lights */}
    
      <Navbar />

      {/* Main Content */}
      <div className="relative p-6 max-w-6xl mx-auto w-full ">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center space-x-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/30">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">User Feed</span>
          </div>
          <h1 className="text-4xl font-bold mt-4 text-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            View All Posts
          </h1>
          <p className="text-gray-400 text-sm mt-2 text-center max-w-md">
            Explore the latest posts shared by authors and editors.
          </p>
        </div>

        {/* Posts Grid */}
      {(user?.role === "Editor" || user?.role === "Admin" || user?.role === "User" )  && list && list.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                  {list.map((p) => (
                    <div
                      key={p._id}
                      className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-md hover:shadow-gray-800/50 transition-all p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-100 truncate">
                          {p.title}
                        </h2>
                      </div>
      
                      <p className="text-sm text-gray-400 line-clamp-3">{p.content}</p>
      
                      <p className="text-xs text-gray-500 mt-2 italic">
                        Author: <span className="text-gray-300">{p?.author?.name || "Unknown"}</span>
                      </p>
      
                     
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center mt-10 underline">
                  View are not available.
                </p>
              )}
      </div>
    </div>
  );
};

export default ViewPosts;
