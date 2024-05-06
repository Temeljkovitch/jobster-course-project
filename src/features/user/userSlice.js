import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/register", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/login", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFetch.patch("/auth/updateUser", user);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, action) => {
      removeUserFromLocalStorage(state.user);
      state.user = null;
      state.isSidebarOpen = false;
      if (action.payload) {
        toast.success(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello there, ${user.name}!`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Welcome back, ${user.name}!`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user } = action.payload;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success("Profile updated successfully!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
