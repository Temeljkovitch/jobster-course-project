import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    // if (page <= 1) {
    //   dispatch(changePage(pages.length));
    //   return;
    // }
    // dispatch(changePage(page - 1));
    let newPage = page - 1;
    if (newPage < 1) newPage = numOfPages;
    dispatch(changePage(newPage));
  };
  const nextPage = () => {
    // if (page > pages.length - 1) {
    //   dispatch(changePage(1));
    //   return;
    // }
    // dispatch(changePage(page + 1));
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1;
    dispatch(changePage(newPage));
  };
  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
