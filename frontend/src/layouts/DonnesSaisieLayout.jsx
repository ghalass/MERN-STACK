import { lazy } from "react";
import { Tabs, Tab } from "react-bootstrap";

const DonneesSaisieHrm = lazy(() =>
  import("../pages/performances/donnees_saisies/DonneesSaisieHrm")
);

export default function DonnesSaisieLayout() {
  return (
    <>
      <Tabs
        defaultActiveKey="saisiehrm"
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
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
  { eventKey: "saisiehrm", title: "Saisies", ele: <DonneesSaisieHrm /> },
];
