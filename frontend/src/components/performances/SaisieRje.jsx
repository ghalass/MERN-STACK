// components
import PannesTable from "./PannesTable";
import PannesTotal from "./PannesTotal";
import SaveButton from "./SaveButton";
import HrmInputs from "./HrmInputs";
import HrmSelects from "./HrmSelects";
import HimSelects from "./HimSelects";

const SaisieRje = () => {
  return (
    <div className="mt-2">
      <div className="row">
        <HrmSelects />

        <div className="col">
          <div>
            <HrmInputs />

            <HimSelects />

            <SaveButton />
          </div>
        </div>
        <div className="col">
          <PannesTotal />

          <PannesTable />
        </div>
      </div>
    </div>
  );
};

export default SaisieRje;
