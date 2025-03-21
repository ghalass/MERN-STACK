import React, { lazy, useState } from "react";

/*** FUNCTIONS */
import { useQuery } from "@tanstack/react-query";

/*** COMPONENTS */
import { Button, Badge } from "react-bootstrap";
import useSiteStore from "../../../stores/useSiteStore";
import { fecthSitesQuery } from "../../../hooks/useSites";
import Pagination from "../../../components/ui/Pagination";

// COMPONENTS
const CumstomModal = lazy(() => import("../../../components/ui/CumstomModal"));
const LoaderSmall = lazy(() => import("../../../components/ui/LoaderSmall"));
const SiteFormDelete = lazy(() => import("./SiteFormDelete"));
const SiteFormUpdate = lazy(() => import("./SiteFormUpdate"));
const SiteFormCreate = lazy(() => import("./SiteFormCreate"));
const SiteItem = lazy(() => import("./SiteItem"));

// ICONS
import { RiFileExcel2Line } from "react-icons/ri";

const SitesPage = () => {
  /** START ZUSTAND STORE */
  const {
    // FILTER
    search,
    setSearch,
    // CRETAE
    isShowCreateModal,
    openCreateModal,
    closeCreateModal,
    // EDIT
    isShowEditModal,
    closeEditModal,
    // DELETE
    isShowDeleteModal,
    closeDeleteModal,
  } = useSiteStore();
  /** END ZUSTAND STORE */

  const getAllQuery = useQuery(fecthSitesQuery());

  // Filter the sites based on the search query
  const filteredSites = getAllQuery.data?.filter((site) =>
    site.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    const newSearchValue = e.target.value;
    if (newSearchValue !== search) {
      setSearch(newSearchValue);
    }
  };

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [sitesPerPage, setSitesPerPage] = useState(5);
  // Calculate current sites to display
  const indexOfLastSite = currentPage * sitesPerPage;
  const indexOfFirstSite = indexOfLastSite - sitesPerPage;
  const currentSites = filteredSites?.slice(indexOfFirstSite, indexOfLastSite);
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Calculate total pages
  const totalPages = Math.ceil(filteredSites?.length / sitesPerPage);

  // EXCEL
  const handleExportExcel = () => {
    console.log("excel export");
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center"></div>
        <div className="my-1 d-flex justify-content-between">
          <div className="d-flex gap-1 text-uppercase">
            Liste des sites
            <div>
              <Badge pill bg="primary">
                {filteredSites?.length}
              </Badge>
            </div>
            {(getAllQuery.isLoading ||
              getAllQuery.isPending ||
              getAllQuery.isRefetching) && (
              <LoaderSmall className="text-primary" />
            )}
          </div>

          <div className="d-flex gap-1 justify-content-end">
            <input
              type="search"
              placeholder="Chercher..."
              className="form-control form-control-sm "
              value={search}
              onChange={handleSearch}
            />

            <Button
              onClick={openCreateModal}
              variant="outline-primary"
              className="rounded-pill"
              size="sm"
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
          </div>
        </div>

        <div className="d-flex gap-2 justify-content-between align-items-center">
          <div>
            <Button
              onClick={handleExportExcel}
              variant="outline-success"
              className="rounded-pill"
              size="sm"
            >
              Excel <RiFileExcel2Line className="mb-1" />
            </Button>
          </div>

          <Pagination
            setPerPage={setSitesPerPage}
            setCurrentPage={setCurrentPage}
            handlePageChange={handlePageChange}
            PerPage={sitesPerPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>

        <table className="table table-hover table-sm table-responsive">
          <thead>
            <tr>
              <th>Nom</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {currentSites && currentSites.length > 0 ? (
              currentSites.map((item, index) => (
                <SiteItem key={index} item={item} />
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={5}>Aucune donnée trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE ********************************************************/}
      <CumstomModal
        show={isShowCreateModal}
        handleClose={closeCreateModal}
        title="Ajouter un nouveau Utilisateur"
      >
        <SiteFormCreate />
      </CumstomModal>

      {/* UPDATE ********************************************************/}
      <CumstomModal
        show={isShowEditModal}
        handleClose={closeEditModal}
        title="Modifier un utilisateur"
      >
        <SiteFormUpdate />
      </CumstomModal>

      {/* DELETE ********************************************************/}
      <CumstomModal
        show={isShowDeleteModal}
        handleClose={closeDeleteModal}
        title="Supprimer un utilisateur"
      >
        <SiteFormDelete />
      </CumstomModal>
    </>
  );
};

export default SitesPage;
