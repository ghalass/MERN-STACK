import React from "react";
import { Badge } from "react-bootstrap";

const SaisieRjeTableTotalRow = ({ saisieRjeQuery }) => {
  return (
    <>
      <tr className="">
        <td></td>
        <td></td>
        <td className="text-center">
          <Badge pill bg="danger">
            {saisieRjeQuery.data?.[0].Saisiehim?.reduce(
              (acc, val) => (acc = acc + val?.him),
              0
            )}
          </Badge>
        </td>
        <td className="text-center">
          <Badge pill bg="danger">
            {saisieRjeQuery.data?.[0].Saisiehim?.reduce(
              (acc, val) => (acc = acc + val?.ni),
              0
            )}
          </Badge>
        </td>
        <td></td>
      </tr>
    </>
  );
};

export default SaisieRjeTableTotalRow;
