

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost, deletePost, updatePost } from "../../store/slices/postsSlice";
import Navbar from "../../components/Navbar";
import { FileText, PlusCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset, setValue } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // 🔹 Handle Add / Update Form Submit
  const onSubmit = (data) => {
    if (editingPost) {
      dispatch(updatePost({ id: editingPost._id,  data }));
    } else {
      dispatch(createPost(data));
    }
    reset();
    setShowForm(false);
    setEditingPost(null);
  };

  // 🔹 Open form in "edit" mode
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
    setValue("title", post.title);
    setValue("content", post.content);
  };

  // 🔹 Close form
  const handleCloseForm = () => {
    setShowForm(false);
    reset();
    setEditingPost(null);
  };

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-auto">
      {/* Background Lights */}
     

      <Navbar />

      <div className="relative p-6 max-w-6xl mx-auto w-full ">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center space-x-2 bg-gray-800/30 px-4 py-2 rounded-full border border-gray-700/30">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Editor Panel</span>
          </div>
          <h1 className="text-4xl font-bold mt-4 text-center bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            Manage Posts
          </h1>
          <p className="text-gray-400 text-sm mt-2 text-center max-w-md">
            Create, edit, delete and manage posts easily in one place.
          </p>
        </div>

        {/* Add Post Button */}
        {user?.role === "Editor" && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2.5 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-gray-800/50 transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              Add Post
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {user?.role === "Editor" && list && list.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
            {list.map((p) => (
              <div
                key={p._id}
                className="bg-gray-900/40  border border-gray-800/50 rounded-2xl shadow-md hover:shadow-gray-800/50 transition-all p-6"
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

                <div className="mt-4 border-t border-gray-800 pt-3 flex justify-between">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deletePost(p._id))}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center mt-10 underline">
            Only Editors can manage posts.
          </p>
        )}
      </div>

      {/* Add/Edit Post Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative bg-gray-900/70 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md shadow-xl"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseForm}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              {editingPost ? "Edit Post" : "Create Post"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Title</label>
                <input
                  {...register("title")}
                  placeholder="Enter post title"
                  className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Content</label>
                <textarea
                  {...register("content")}
                  placeholder="Write post content"
                  rows="4"
                  className="w-full mt-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-gray-700 to-gray-800 py-2.5 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-gray-800/50 transition-all transform hover:scale-105"
            >
              {editingPost ? "Update Post" : "Create Post"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
