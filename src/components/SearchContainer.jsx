import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearFilters());
  };

  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* Search Position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* Search by Status */}
          <FormSelect
            text="status"
            name="searchStatus"
            value={searchStatus}
            options={["all", ...statusOptions]}
            handleChange={handleSearch}
          />
          {/* Search by Type */}
          <FormSelect
            text="type"
            name="searchType"
            value={searchType}
            options={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
          />
          {/* Sort */}
          <FormSelect
            name="sort"
            value={sort}
            options={sortOptions}
            handleChange={handleSearch}
          />
          <button
            disabled={isLoading}
            className="btn btn-block btn-danger"
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
