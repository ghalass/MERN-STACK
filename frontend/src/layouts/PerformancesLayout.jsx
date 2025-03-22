import { lazy } from "react";
import { Tabs, Tab } from "react-bootstrap";
import HeuresChassis from "../pages/performances/rapports_performances/HeuresChassis";

// COMPONENTS
const ParetosInDispo = lazy(() =>
  import("../pages/performances/rapports_performances/ParetosInDispo")
);
const UnitePhysique = lazy(() =>
  import("../pages/performances/rapports_performances/UnitePhysique")
);
const EtatMensuel = lazy(() =>
  import("../pages/performances/rapports_performances/EtatMensuel")
);
const RapportIndispo = lazy(() =>
  import("../pages/performances/rapports_performances/RapportIndispo")
);

const RapportRje = lazy(() =>
  import("../pages/performances/rapports_performances/RapportRje")
);

export default function PerformancesLayout() {
  return (
    <>
      <Tabs
        defaultActiveKey="rapportrje"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {TABS_LIST.map((tab, index) => (
          <Tab key={index} eventKey={tab.eventKey} title={tab.title}>
            {tab.ele}
          </Tab>
        ))}
      </Tabs>
    </>
  );
}

const TABS_LIST = [
  { eventKey: "rapportrje", title: "Rapport RJE", ele: <RapportRje /> },
  {
    eventKey: "unitephysique",
    title: "Unité Physique",
    ele: <UnitePhysique />,
  },
  {
    eventKey: "etatmensuel",
    title: "Etat Mensuel",
    ele: <EtatMensuel />,
  },
  {
    eventKey: "rapportindispo",
    title: "Rapport d'indispo",
    ele: <RapportIndispo />,
  },
  {
    eventKey: "heureschassis",
    title: "Rapport Heures Chassis",
    ele: <HeuresChassis />,
  },
  {
    eventKey: "paretoindispo",
    title: "Paretos",
    ele: <ParetosInDispo />,
  },
];
