import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import { clearFilters, handleChange } from "../features/allJobs/allJobsSlice";
import { useMemo, useState } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(handleChange({ name, value }));
  };

  const debounce = () => {
    let timeoutID;
    return (event) => {
      setLocalSearch(event.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(
          handleChange({ name: event.target.name, value: event.target.value })
        );
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce());

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* Search Position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
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
