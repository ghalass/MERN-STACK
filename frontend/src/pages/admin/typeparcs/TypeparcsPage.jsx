import React from "react";
import { Button } from "react-bootstrap";
import TypeparcList from "./TypeparcList";
import TypeparcModal from "./TypeparcModal";
import useTypeparcStore from "../../../stores/useTypeparcStore";

const TypeparcsPage = () => {
  const { openModal } = useTypeparcStore();
  return (
    <div>
      <div>
        <h5>Gestion des typepacs</h5>
        <Button
          onClick={openModal}
          className="btn btn-sm rounded-pill "
          variant="outline-primary"
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
        <TypeparcList />
        <TypeparcModal />
      </div>
    </div>
  );
};

export default TypeparcsPage;
