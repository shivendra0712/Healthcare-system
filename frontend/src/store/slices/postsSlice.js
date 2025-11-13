import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { toast } from "react-toastify";



// Fetch all posts (Public)
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
        console.log("fetching posts");
      const res = await api.get("/posts");
      console.log(res.data);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch posts");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Fetch single post
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch post");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Create post (Editor only)
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/posts", data);
      toast.success("Post created successfully!");
      console.log(res.data);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Update post (Editor only)
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
        console.log("updating post", id, data);
      const res = await api.put(`/posts/${id}`, data);
      
      toast.success("Post updated successfully!");

      return res.data;
    } catch (err) {
      toast.error("Failed to update post");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Delete post (Editor only)
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted");
      return id;
    } catch (err) {
      toast.error("Failed to delete post");
      return rejectWithValue(err.response?.data);
    }
  }
);


const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    singlePost: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSinglePost: (state) => {
      state.singlePost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch single post
      .addCase(fetchSinglePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singlePost = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create post
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update post

      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const idx = state.list.findIndex((p) => p._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete post

      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      })

      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSinglePost } = postSlice.actions;
export default postSlice.reducer;
