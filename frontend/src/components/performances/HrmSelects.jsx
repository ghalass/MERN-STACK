import React, { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { useQuery } from "@tanstack/react-query";
import { useSaisierjeStore } from "../../store/saisierjeStore";
import { apiRequest } from "../../utils/apiRequest";
import useAuthStore from "../../store/authStore";

const HrmSelects = () => {
  const user = useAuthStore((state) => state.user);

  // GET ALL SITES
  const { getAll: getSites } = useCrud("/sites");
  const { data: sites } = useQuery({
    queryKey: ["sitesList"],
    queryFn: getSites,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  // GET ALL PARCS
  const { getAll: getParcs } = useCrud("/parcs");
  const { data: parcs } = useQuery({
    queryKey: ["parcsList"],
    queryFn: getParcs,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  const [hrmSelect, setHrmSelect] = useState({
    du: new Date().toISOString().split("T")[0],
    siteId: "",
    parcId: "",
    enginId: "",
  });

  // GET ENGINS BY PARC_ID
  const { getOne: getEngins } = useCrud(`/engins/byparcid/${hrmSelect.parcId}`);
  const { data: engins } = useQuery({
    queryKey: ["enginsList", hrmSelect.parcId],
    queryFn: () => (hrmSelect.parcId ? getEngins() : Promise.resolve([])),
    enabled: !!hrmSelect.parcId,
  });

  // FILTER ENGINS BY SITE
  const [filteredEngins, setFilteredEngins] = useState([]);
  useEffect(() => {
    if (engins && engins.length > 0 && hrmSelect.siteId) {
      const filtered = engins.filter(
        (engin) => engin.siteId === parseInt(hrmSelect.siteId)
      );
      setFilteredEngins(filtered);
    } else {
      setFilteredEngins([]);
    }
  }, [hrmSelect, engins]);

  // GET SAISIE HRM
  useEffect(() => {
    /**
     * ré-initialiser tout
     */
    useSaisierjeStore.setState((state) => ({
      saisiehrm: { ...state.saisiehrm, hrm: "", id: "" },
      saisiehim: [],
      pannesLists: [],
    }));
    /***
     *
     */

    const fetchData = async () => {
      console.log(hrmSelect);

      if (hrmSelect.enginId !== "") {
        const valeurs = {
          du: hrmSelect.du,
          enginId: hrmSelect.enginId,
          siteId: hrmSelect.siteId,
        };

        useSaisierjeStore.setState({
          hrmSelects: valeurs,
        });

        console.log(valeurs);

        if (valeurs.du !== "" && valeurs.enginId !== "") {
          console.log("ok");

          try {
            const response = await apiRequest(
              `/saisiehrm/getSaisieHrm`,
              "POST",
              valeurs,
              user?.token
            );

            if (response) {
              if (response[0]) {
                console.log(response[0]);
                // SET saisiehrm
                useSaisierjeStore.setState({
                  saisiehrm: {
                    id: response[0]?.id,
                    du: new Date(response[0]?.du).toISOString().split("T")[0],
                    enginId: response[0]?.enginId,
                    siteId: response[0]?.siteId,
                    hrm: response[0]?.hrm,
                  },
                });

                // SET saisiehim
                if (response[0]?.Saisiehim) {
                  useSaisierjeStore.setState({
                    saisiehim: response[0]?.Saisiehim,
                  });

                  let b = [];
                  if (response[0]?.Saisiehim) {
                    response[0]?.Saisiehim.map((pannesListsElem) => {
                      // console.log(pannesListsElem);
                      let a = {
                        panneId: pannesListsElem.panneId,
                        panne_name: pannesListsElem.Panne.name,
                        him: pannesListsElem.him,
                        ni: pannesListsElem.ni,
                      };
                      // console.log(a);
                      b.push(a);
                    });
                  }
                  useSaisierjeStore.setState({
                    pannesLists: b,
                  });
                }
              }
            }
          } catch (error) {
            console.error("Erreur lors de la requête :", error);
          }
        }
      }
    };

    fetchData();
  }, [hrmSelect]);

  useEffect(() => {
    useSaisierjeStore.setState((state) => ({
      hrmSelects: { ...state.hrmSelects, enginId: "", hrm: "" },
    }));
  }, [hrmSelect.siteId]);

  useEffect(() => {
    useSaisierjeStore.setState((state) => ({
      hrmSelects: { ...state.hrmSelects, enginId: "", hrm: "" },
    }));
  }, [hrmSelect.parcId]);

  useEffect(() => {
    useSaisierjeStore.setState((state) => ({
      hrmSelects: { ...state.hrmSelects, hrm: "" },
    }));
  }, [hrmSelect.enginId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHrmSelect((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="col">
      <div className="form-floating mb-2">
        <input
          type="date"
          className="form-control"
          id="du"
          name="du"
          placeholder="Rapport du"
          value={hrmSelect.du}
          onChange={handleChange}
        />
        <label htmlFor={"du"}>Rapport du</label>
      </div>

      <div className="form-floating mb-2">
        <select
          className={`form-select`}
          id={"siteId"}
          name="siteId"
          value={hrmSelect.siteId}
          onChange={handleChange}
        >
          <option value="">Choisir un site</option>
          {sites?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={"siteId"}>Site</label>
      </div>

      <div className="form-floating mb-2">
        <select
          className={`form-select`}
          id={"parcId"}
          name="parcId"
          value={hrmSelect.parcId}
          onChange={handleChange}
        >
          <option value="">Choisir un parc</option>
          {parcs?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={"parcId"}>Parc</label>
      </div>

      <div className="form-floating mb-2">
        <select
          className={`form-select`}
          id={"enginId"}
          name="enginId"
          value={hrmSelect.enginId}
          onChange={handleChange}
        >
          <option value="">Choisir un engin</option>
          {filteredEngins?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={"enginId"}>Engin</label>
      </div>
    </div>
  );
};

export default HrmSelects;
