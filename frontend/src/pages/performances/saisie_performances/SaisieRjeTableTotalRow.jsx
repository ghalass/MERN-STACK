import React from "react";
import { Badge } from "react-bootstrap";
import useSaisieRjeStore from "../../../stores/useSaisieRjeStore";

const SaisieRjeTableTotalRow = () => {
  const { saisieRjeQueryStore } = useSaisieRjeStore();

  return (
    <>
      <tr className="">
        <td></td>
        <td></td>
        <td className="text-center">
          <Badge pill bg="danger">
            {saisieRjeQueryStore.data?.[0].Saisiehim?.reduce(
              (acc, val) => (acc = acc + val?.him),
              0
            )}
          </Badge>
        </td>
        <td className="text-center">
          <Badge pill bg="danger">
            {saisieRjeQueryStore.data?.[0].Saisiehim?.reduce(
              (acc, val) => (acc = acc + val?.ni),
              0
            )}
          </Badge>
        </td>
      </tr>
    </>
  );
};

export default SaisieRjeTableTotalRow;
