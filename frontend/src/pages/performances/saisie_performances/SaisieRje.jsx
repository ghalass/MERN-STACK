import { useState } from "react";
import SaisieRjeSelects from "./SaisieRjeSelects";
import SaisieRjeTable from "./SaisieRjeTable";

const SaisieRje = () => {
  const [saisierje, setSaisierje] = useState([]);

  const [isloading, setIsloading] = useState(false);

  return (
    <>
      <SaisieRjeSelects
        setSaisierje={setSaisierje}
        setIsloading={setIsloading}
      />

      <SaisieRjeTable saisierje={saisierje} isloading={isloading} />
    </>
  );
};

export default SaisieRje;
