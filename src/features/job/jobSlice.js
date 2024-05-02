import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  location: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFetch.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;
      state[name] = value;
    },
    clearValues: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job created successfully!");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      });
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
