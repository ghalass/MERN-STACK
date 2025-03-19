// SitesPage.jsx

import React from "react";

import SiteList from "./SiteList";
import SiteModal from "./SiteModal";
import { Button } from "react-bootstrap";
import useSiteStore from "../../../stores/useSiteStore";

const SitesPage = () => {
  const { openModal } = useSiteStore();

  return (
    <div>
      <div>
        <h1>Gestion des sites</h1>
        <Button onClick={openModal}>Ajouter un site</Button>
        <SiteList />
        <SiteModal />
      </div>
    </div>
  );
};

export default SitesPage;
