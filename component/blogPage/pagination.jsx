import React, { useState } from "react";
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
  const [inputPage, setInputPage] = useState("");

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

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
          <input
            id="pageSelector"
            className="page-link"
            style={{
              marginLeft: "1em",
              width: "2em",
              padding: "0em",
              textAlign: "center",
            }}
            value={inputPage}
            onChange={(event) => {
              if (isNumeric(event.nativeEvent.data)) {
                setInputPage(event.target.value);
              } else if (event.nativeEvent.data === null) {
                setInputPage(
                  event.target.value.substring(0, event.target.value.length)
                );
              }
            }}
            onKeyDown={(event) => {
              if (
                event.code === "Enter" &&
                isNumeric(inputPage) &&
                inputPage <= pagesCount
              ) {
                handlePageChange(parseInt(inputPage, 10));
              }

              if (event.code === "Enter" && !isNumeric(inputPage)) {
                alert("Please input a number!");
                return;
              }

              if (event.code === "Enter" && inputPage > pagesCount) {
                alert("Do not have so many pages!");
                return;
              }
            }}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
