import React from "react";

const TypeparcsList = () => {
  return (
    <div className="card">
      <div className="card-header">Typeparcs</div>
      <div className="card-body">
        <p>
          Typeparcs 1{" "}
          <i className="bi bi-pencil btn btn-sm btn-outline-info rounded-circle me-1"></i>
          <i className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-circle me-1"></i>
        </p>
        <p>Typeparcs 2</p>
        <p>Typeparcs 3</p>
        <p>Typeparcs 4</p>
        <p>Typeparcs 5</p>
      </div>
    </div>
  );
};

export default TypeparcsList;
