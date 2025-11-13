import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { toast } from "react-toastify";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const res = await api.get("/users");
        return res.data;
    } catch (err) {
        toast.error("Failed to fetch users");
        return rejectWithValue(err.response?.data);
    }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted");
      return id;
    } catch (err) {
      toast.error("Failed to delete user");
      return rejectWithValue(err.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
