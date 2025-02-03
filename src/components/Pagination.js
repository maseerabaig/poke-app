import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
        Previous
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
