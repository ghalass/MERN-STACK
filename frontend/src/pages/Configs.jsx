import SitesList from "../components/configs/sites/SItesList";
import TypeparcsList from "../components/configs/typeparcs/TypeparcsList";
import ParcsList from "../components/configs/parcs/ParcsList";

const Configs = () => {
  return (
    <div className="mt-2">
      <div className="row">
        {/* SITES */}
        <div className="col">
          <SitesList />
        </div>

        {/*  */}
        {/* Typeparcs */}
        <div className="col">
          <TypeparcsList />
        </div>

        {/*  */}
        {/* Parcs */}
        <div className="col">
          <ParcsList />
        </div>
      </div>
    </div>
  );
};

export default Configs;
