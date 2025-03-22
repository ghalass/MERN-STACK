import { lazy } from "react";
import { Tabs, Tab } from "react-bootstrap";
import ParetosInDispo from "../pages/performances/rapports_performances/ParetosInDispo";
import UnitePhysique from "../pages/performances/rapports_performances/UnitePhysique";
import EtatMensuel from "../pages/performances/rapports_performances/EtatMensuel";

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
    eventKey: "paretoindispo",
    title: "Paretos",
    ele: <ParetosInDispo />,
  },
];
