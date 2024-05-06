import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormSelect } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../features/job/jobSlice";

const AddJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please, fill out all fields!");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          {/* Position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* Company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* Location */}
          <FormRow
            type="text"
            name="jobLocation"
            text="job location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* Status */}
          <FormSelect
            name="status"
            text="job status"
            defaultValue={status}
            options={statusOptions}
            handleChange={handleJobInput}
          />
          {/* Type */}
          <FormSelect
            name="jobType"
            text="job type"
            defaultValue={jobType}
            options={jobTypeOptions}
            handleChange={handleJobInput}
          />
          {/* Buttons */}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-block submit-btn"
            >
              {isLoading ? "please, wait..." : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
