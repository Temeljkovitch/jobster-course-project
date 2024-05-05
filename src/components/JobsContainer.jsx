import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector } from "react-redux";
import Job from "./Job";
import Loading from "./Loading";

const JobsContainer = () => {
  const { jobs, isLoading } = useSelector((store) => store.allJobs);
  console.log(jobs)

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center/>
      </Wrapper>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job}  />
        })}
      </div>
    </Wrapper>
  )
};

export default JobsContainer;
