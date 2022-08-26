import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const {
    currentPage,
    numbersOfItems,
    pageSize,
    handlePageChange,
    handlePageMinus,
    handlePagePlus,
  } = props;
  const pagesCount = Math.ceil(numbersOfItems / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div style={{ textAlign: "center" }}>
      <nav
        aria-label="Page navigation example"
        style={{ display: "inline-block" }}
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => handlePageMinus(currentPage)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => handlePagePlus(currentPage, numbersOfItems)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
