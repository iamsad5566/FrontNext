import React, { useEffect, useState } from "react";
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
  let len = pages.length;

  let isNumeric = (value) => {
    return /^-?\d+$/.test(value);
  };

  const flattenLayout = () => {
    return pages.map((page) => (
      <li
        key={page}
        className={page === currentPage ? "page-item active" : "page-item"}
      >
        <button className="page-link" onClick={() => handlePageChange(page)}>
          {page}
        </button>
      </li>
    ));
  };

  const zipLayout = (currentPage) => {
    if (currentPage >= len - 1) {
      return (
        <React.Fragment>
          <li key={1} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(1)}>
              {1}
            </button>
          </li>
          <li key={2} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(2)}>
              {2}
            </button>
          </li>
          <li key={3} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(3)}>
              {3}
            </button>
          </li>
          <span className="page-link">......</span>
          <li
            key={len - 1}
            className={
              len - 1 === currentPage ? "page-item active" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(len - 1)}
            >
              {len - 1}
            </button>
          </li>
          <li
            key={len}
            className={len === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => handlePageChange(len)}>
              {len}
            </button>
          </li>
        </React.Fragment>
      );
    } else if (currentPage === len - 2) {
      return (
        <React.Fragment>
          <li key={1} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(1)}>
              {1}
            </button>
          </li>
          <li key={2} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(2)}>
              {2}
            </button>
          </li>
          <span className="page-link">......</span>
          <li key={currentPage} className="page-item active">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </button>
          </li>
          <li key={currentPage + 1} className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          </li>
          <li key={currentPage + 2} className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 2)}
            >
              {currentPage + 2}
            </button>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {currentPage === 1 ? (
            <></>
          ) : (
            <li key={currentPage - 1} className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            </li>
          )}

          <li key={currentPage} className="page-item active">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </button>
          </li>
          <li key={currentPage + 1} className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          </li>
          {currentPage === 1 ? (
            <li key={currentPage + 2} className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 2)}
              >
                {currentPage + 2}
              </button>
            </li>
          ) : (
            <></>
          )}
          <span className="page-link">......</span>
          <li key={len - 1} className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageChange(len - 1)}
            >
              {len - 1}
            </button>
          </li>
          <li key={len} className="page-item">
            <button className="page-link" onClick={() => handlePageChange(len)}>
              {len}
            </button>
          </li>
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    setInputPage("");
  }, [currentPage]);

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
          {pages.length < 6 ? flattenLayout() : zipLayout(currentPage)}

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
                (event.code === "Enter" || event.key === "Enter") &&
                isNumeric(inputPage) &&
                inputPage <= pagesCount
              ) {
                handlePageChange(parseInt(inputPage, 10));
              }

              if (
                (event.code === "Enter" || event.key === "Enter") &&
                !isNumeric(inputPage)
              ) {
                alert("Please input a number!");
                return;
              }

              if (
                (event.code === "Enter" || event.key === "Enter") &&
                inputPage > pagesCount
              ) {
                alert("Do not have so many pages!");
                return;
              }
            }}
            autoComplete="off"
          />
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
