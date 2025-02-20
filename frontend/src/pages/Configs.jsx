import SitesList from "../components/configs/sites/SItesList";
import TypeparcsList from "../components/configs/typeparcs/TypeparcsList";
import ParcsList from "../components/configs/parcs/ParcsList";
import EnginsList from "../components/configs/engins/EnginsList";

const Configs = () => {
  return (
    <div className="mt-2 ">
      <div className=" d-flex flex-wrap gap-1 justify-content-center">
        <SitesList />
        <TypeparcsList />
        <ParcsList />
        <EnginsList />
      </div>
    </div>
  );
};

export default Configs;
