import SitesList from "../components/configs/sites/SItesList";
import TypeparcsList from "../components/configs/typeparcs/TypeparcsList";
import ParcsList from "../components/configs/parcs/ParcsList";
import EnginsList from "../components/configs/engins/EnginsList";

const Configs = () => {
  return (
    <div className="mt-2 ">
      {/* d-flex flex-wrap gap-1 justify-content-center */}
      <div className="row ">
        <div className="col-sm-12 col-md-3 mb-1">
          <SitesList />
        </div>
        <div className="col-sm-12 col-md-3 mb-1">
          <TypeparcsList />
        </div>
        <div className="col-sm-12 col-md-3 mb-1">
          <ParcsList />
        </div>
        <div className="col-sm-12 col-md-3 mb-1">
          <EnginsList />
        </div>
      </div>
    </div>
  );
};

export default Configs;
