import React, { useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";

const UnitePhysique = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  const handleClick = () => {
    console.log(date);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <FloatingLabel
          controlId="floatingInputDate"
          label="Date de saisie"
          className=""
        >
          <Form.Control
            type="month"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            // disabled={generateRjeQuery.isFetching}
          />
        </FloatingLabel>

        <Button
          // disabled={generateRjeQuery.isFetching}
          onClick={handleClick}
          variant="outline-secondary"
        >
          <div className="d-flex gap-1">
            {/* {generateRjeQuery.isFetching && <LoaderSmall />} */}
            <div> Générer le rapport</div>
          </div>
        </Button>
      </div>
      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        className="text-center text-uppercase"
      >
        <thead>
          <tr>
            <th colSpan={2}></th>

            <th colSpan={2}>PG11</th>

            <th colSpan={2}>TO14</th>

            <th colSpan={2}>Mensuel</th>

            <th colSpan={2}>Annuel</th>
          </tr>
          <tr>
            <th>Parc</th>
            <th>Nbre</th>

            <th>HRM</th>
            <th>HIM</th>

            <th>HRM</th>
            <th>HIM</th>

            <th>HRM</th>
            <th>HIM</th>

            <th>HRM</th>
            <th>HIM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>

            <td></td>
            <td></td>

            <td></td>
            <td></td>

            <td></td>
            <td></td>

            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default UnitePhysique;
