import React from "react";

const ParcsList = () => {
  return (
    <div className="card">
      <div className="card-header">Parcs</div>
      <div className="card-body">
        <p>
          Parcs 1{" "}
          <i className="bi bi-pencil btn btn-sm btn-outline-info rounded-circle me-1"></i>
          <i className="bi bi-trash3 btn btn-sm btn-outline-danger rounded-circle me-1"></i>
        </p>
        <p>Parcs 2</p>
        <p>Parcs 3</p>
        <p>Parcs 4</p>
        <p>Parcs 5</p>
      </div>
    </div>
  );
};

export default ParcsList;
