import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        const { user } = action.payload;
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
        state.user = action.payload;
        const { user } = action.payload;
        addUserToLocalStorage(user);
        toast.success(`Welcome back, ${user.name}!`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = true;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
