import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { logoutUser } from "../user/userSlice";
import { toast } from "react-toastify";
import { hideLoading, showLoading, getAllJobs } from "../allJobs/allJobsSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
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
      const response = await customFetch.post("/jobs", job);
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

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await customFetch.patch(`/jobs/${jobId}`, job);
      thunkAPI.dispatch(clearValues());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    const token = thunkAPI.getState().user.user.token;
    try {
      const response = await customFetch.delete(`/jobs/${jobId}`);
      thunkAPI.dispatch(getAllJobs());
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
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
    clearValues: () => {
      return initialState;
    },
    setEditJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
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
      })
      .addCase(deleteJob.fulfilled, () => {
        toast.success("Job deleted successfully!");
      })
      .addCase(deleteJob.rejected, (_, action) => {
        const errorMessage = action.payload;
        toast.error(errorMessage);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job updated successfully!");
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload;
        toast.error(errorMessage);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
