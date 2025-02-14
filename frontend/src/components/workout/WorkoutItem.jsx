import { lazy, Suspense } from "react";
import { formatDateAgo } from "../../utils/func";
const WorkoutModal = lazy(() => import("./WorkoutModal"));

import Card from "react-bootstrap/Card";

const WorkoutItem = ({ workout }) => {
  // GLOBAL STATES

  return (
    <Card className="cardItem">
      <Card.Body>
        <Card.Title>{workout.title.slice(0, 20)}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <strong>Load (Kg): </strong>
          {workout.load}
        </Card.Subtitle>
        <Card.Text>
          <strong>Reps: </strong>
          {workout.reps}
        </Card.Text>

        <div className="d-flex flex-column fw-light timestamps">
          <span className="text-success">
            <i className="bi bi-plus-lg "></i>{" "}
            <small className="fst-italic">
              {formatDateAgo(workout.createdAt)}
            </small>
          </span>
          <span className="text-primary">
            <i className="bi bi-arrow-clockwise "></i>{" "}
            <small className="fst-italic">
              {formatDateAgo(workout.updatedAt)}
            </small>
          </span>
        </div>
      </Card.Body>

      <Card.Footer className="text-muted crudOperation">
        <div className="d-flex gap-2 justify-content-end ">
          <Suspense>
            <WorkoutModal workout={workout} crudOp="update" />
          </Suspense>
          <Suspense>
            <WorkoutModal workout={workout} crudOp="delete" />
          </Suspense>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default WorkoutItem;
