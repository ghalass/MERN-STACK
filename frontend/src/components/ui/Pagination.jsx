import React from "react";
import { Button } from "react-bootstrap";
import { getMultiplesOf10 } from "../../utils/func";

const Pagination = ({
  setPerPage,
  setCurrentPage,
  handlePageChange,
  PerPage,
  totalPages,
  currentPage,
}) => {
  return (
    <>
      <div className="d-flex gap-1 justify-content-end align-items-center">
        <div style={{ width: "50px" }}>
          <select
            className="form-control form-control-sm"
            defaultValue={PerPage}
            onChange={(e) => {
              setPerPage(e.target.value);
              setCurrentPage(1);
            }}
          >
            {getMultiplesOf10(totalPages)?.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline-primary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="bi bi-arrow-left"></i>
        </Button>

        <div className="d-flex gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={
                index + 1 === currentPage ? "primary" : "outline-primary"
              }
              size="sm"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline-primary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="bi bi-arrow-right"></i>
        </Button>
      </div>
    </>
  );
};

export default Pagination;
