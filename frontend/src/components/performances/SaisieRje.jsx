import FormInput from "../forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saisierjeValidation } from "../../validations/saisierjeValidation";
import Error from "../forms/Error";
import SubmitButton from "../forms/SubmitButton";
import FormSelect from "../forms/FormSelect";
import { useCrud } from "../../hooks/useCrud";
import { useEffect, useState } from "react";
import { useSaisierjeStore } from "../../store/saisierjeStore";
import toast from "react-hot-toast";
import { apiRequest } from "../../utils/apiRequest";
import useAuthStore from "../../store/authStore";

const SaisieRje = () => {
  const user = useAuthStore((state) => state.user);

  const current = useSaisierjeStore((state) => state.current);
  const saisiehrm = useSaisierjeStore((state) => state.saisiehrm);

  const setUsersList = useSaisierjeStore((state) => state.setUsersList);
  const pannesLists = useSaisierjeStore((state) => state.pannesLists);
  const createPanne = useSaisierjeStore((state) => state.createPanne);
  const deletPanne = useSaisierjeStore((state) => state.deletPanne);

  const totalHim = useSaisierjeStore((state) => state.totalHim);
  const totalNi = useSaisierjeStore((state) => state.totalNi);
  const dispo = useSaisierjeStore((state) => state.dispo);

  // GET ALL SITES
  const { getAll: getSites } = useCrud("/sites");
  const { data: sites } = useQuery({
    queryKey: ["sitesList"],
    queryFn: getSites,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });
  // GET ALL TYPEPANNES
  const { getAll: getTypepannes } = useCrud("/typepannes");
  const { data: typepannes } = useQuery({
    queryKey: ["typepannesList"],
    queryFn: getTypepannes,
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });
  // GET ALL PANNES
  const { getAll: getPannes } = useCrud("/pannes");
  const { data: pannes } = useQuery({
    queryKey: ["pannesList"],
    queryFn: getPannes,
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

  const {
    register,
    handleSubmit,
    reset,
    watch, // 👈 Ajout de watch pour surveiller les valeurs
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(saisierjeValidation),
    defaultValues: {
      date_saisie: current.du, //new Date().toISOString().split("T")[0], // Format YYYY-MM-DD
      parcId: "",
      tyepanneId: "",
      panneId: "",

      //
      enginId: "",
      siteId: "",
      hrm: saisiehrm.hrm,
    },
  });

  // GET ENGINS
  const selectedParc = watch("parcId");
  // Ne pas appeler l'API si `selectedParc` est vide
  const { getOne: getEngins } = useCrud(`/engins/byparcid/${selectedParc}`);
  const { data: engins } = useQuery({
    queryKey: ["enginsList", selectedParc], // 👈 Ajout de selectedParc comme clé
    queryFn: () => (selectedParc ? getEngins() : Promise.resolve([])), // 👈 Vérification avant appel API
    enabled: !!selectedParc, // 👈 Bloquer la requête si selectedParc est vide
    retry: 1, // Reduce retries for faster error detection
    retryDelay: 2000, // Wait before retrying
  });

  const selectedSite = watch("siteId");
  const [filteredEngins, setFilteredEngins] = useState([]);

  // Appliquer le filtrage lorsque `selectedSite` change
  useEffect(() => {
    if (engins && engins.length > 0 && selectedSite) {
      const filtered = engins.filter(
        (engin) => engin.siteId === parseInt(selectedSite)
      );
      setFilteredEngins(filtered); // Met à jour l'état avec les engins filtrés
    } else {
      setFilteredEngins([]); // Réinitialise si aucun engin ne correspond
    }
  }, [selectedSite, engins]); // Déclenche le filtre chaque fois que `selectedSite` ou `engins` change

  //

  const selectedTypepanne = watch("typepanneId");
  const [filteredPannes, setFilteredPannes] = useState([]);
  useEffect(() => {
    if (pannes && pannes.length > 0 && selectedTypepanne) {
      const filtered = pannes.filter(
        (panne) => panne.typepanneId === parseInt(selectedTypepanne)
      );
      setFilteredPannes(filtered); // Met à jour l'état avec les pannes filtrés
    } else {
      setFilteredPannes([]); // Réinitialise si aucun engin ne correspond
    }
  }, [selectedTypepanne, pannes]); // Déclenche le filtre chaque fois que `selectedTypepanne` ou `engins` change

  const handleDeleteHim = (him) => {
    console.log(him);

    deletPanne(him);
  };

  const handleAddPanne = () => {
    const panne_name = pannes.find(
      (item) => item.id === parseInt(getValues("panneId"))
    );

    const newHIM = {
      panneId: parseInt(getValues("panneId")),
      panne_name: panne_name?.name,
      him: getValues("him"),
      ni: getValues("ni"),
    };

    if (!newHIM.panneId || !newHIM.him || !newHIM.ni) {
      alert("completer les champs");
    } else {
      createPanne(newHIM);
    }
  };

  // Mutations;
  const queryClient = useQueryClient();
  const { create } = useCrud("/saisiehrm/saveSaisiehrm");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      reset(); // ✅ Reset form after submission
      toast.success("Saisie avec succès!");
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["enginsList"] });
    },
  });

  const onSubmit = async (data) => {
    const dataSaisieRje = {
      du: new Date(data.date_saisie), // Convertit la string en objet Date
      enginId: data.enginId,
      siteId: data.siteId,
      hrm: data.hrm,
      hims: pannesLists,
    };
    console.log(dataSaisieRje);
    mutate(dataSaisieRje);
  };

  //
  //
  // GET SAISIE
  const selectedEngin = watch("enginId");

  useEffect(() => {
    const fetchData = async () => {
      // ré-initialiser tout
      useSaisierjeStore.setState({
        saisiehrm: {},
        saisiehim: {},
      });
      if (parseInt(selectedEngin) !== 0) {
        const valeurs = {
          du: new Date(getValues("date_saisie")).toISOString().split("T")[0],
          enginId: parseInt(getValues("enginId")),
        };

        try {
          const response = await apiRequest(
            `/saisiehrm/getSaisieHrm`,
            "POST",
            valeurs,
            user?.token
          );

          if (response) {
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
            console.log(response[0]?.Saisiehim);
            useSaisierjeStore.setState({ saisiehim: response[0]?.Saisiehim });
          }
        } catch (error) {
          console.error("Erreur lors de la requête :", error);
        }
      }
    };
    if (selectedEngin) {
      fetchData(); // Appeler la fonction interne
    }
  }, [selectedEngin]); // Déclencher useEffect lorsque selectedEngin change

  const saveAll = async () => {
    console.log(useSaisierjeStore.getState()?.pannesLists);
    const a = useSaisierjeStore.getState()?.pannesLists;

    a.map(async (e) => {
      try {
        const b = useSaisierjeStore.getState()?.saisiehrm?.id;

        const himToSaisie = {
          panneId: e.panneId,
          him: e.him,
          ni: e.ni,
          saisiehrmId: b,
        };

        // console.log(himToSaisie);

        const response = await apiRequest(
          `/saisiehrm/createSaisieHim`,
          "POST",
          himToSaisie,
          user?.token
        );
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    });
  };

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <FormInput
                  type="date"
                  id="date_saisie"
                  label="Rapport du"
                  placeholder="Rapport du"
                  register={register}
                  errors={errors}
                />

                <FormSelect
                  id="siteId"
                  label="Site"
                  register={register}
                  errors={errors}
                  options={sites}
                  text="Choisir un site"
                />

                <FormSelect
                  id="parcId"
                  label="Parc"
                  register={register}
                  errors={errors}
                  options={parcs}
                  text="Choisir un parc"
                />

                <FormSelect
                  id="enginId"
                  label="Engin"
                  register={register}
                  errors={errors}
                  options={filteredEngins}
                  text="Choisir un engin"
                />
              </div>
            </div>
            <SubmitButton
              disabled={isPending}
              type="submit"
              isProcessing={isPending}
              operation={"add"}
              cls="success"
              icon={null}
              fullWidth={false}
            />
            <Error error={isError ? error.message : ""} />
          </form>
        </div>
        <div className="col">
          <div>
            <div className="d-flex gap-1">
              <div className="form-floating mb-2">
                <input
                  type="number"
                  className={`form-control`}
                  id="hrm"
                  placeholder="HRM"
                  value={useSaisierjeStore.getState()?.saisiehrm?.hrm || ""}
                  onChange={(e) => {
                    const newId = e.target.value;
                    useSaisierjeStore.setState((state) => ({
                      saisiehrm: {
                        ...state.saisiehrm,
                        hrm: newId,
                      },
                    }));
                  }}
                />
                <label htmlFor="hrm">HRM</label>
              </div>

              <div className="form-floating mb-2">
                <input
                  type="number"
                  className={`form-control`}
                  disabled
                  id="id"
                  placeholder="Id"
                  value={useSaisierjeStore.getState()?.saisiehrm?.id || ""}
                  onChange={(e) => {
                    const newId = e.target.value;
                    useSaisierjeStore.setState((state) => ({
                      saisiehrm: {
                        ...state.saisiehrm,
                        id: newId,
                      },
                    }));
                  }}
                />
                <label htmlFor="id">id</label>
              </div>
            </div>

            <div className="d-flex gap-1 align-items-center justify-content-around">
              <FormSelect
                id="typepanneId"
                label="Type de Panne"
                register={register}
                errors={errors}
                options={typepannes}
                text="Choisir Type de Panne"
              />
              <FormSelect
                id="panneId"
                label="Panne"
                register={register}
                errors={errors}
                options={filteredPannes}
                text="Choisir un panne"
              />
              <div>
                <button
                  onClick={handleAddPanne}
                  className="btn btn-sm btn-outline-info rounded-pill"
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
            <div className="d-flex gap-1 align-items-center justify-content-center">
              <FormInput
                type="number"
                min={0}
                max={24}
                id="him"
                label="HIM"
                placeholder="HIM"
                register={register}
                errors={errors}
              />
              <FormInput
                type="number"
                min={0}
                id="ni"
                label="NI"
                placeholder="NI"
                register={register}
                errors={errors}
              />
            </div>

            <div>
              {useSaisierjeStore.getState()?.saisiehrm?.id !== undefined ? (
                <div>
                  <div className="alert alert-info">
                    <i className="bi bi-check-circle me-2"></i>Saisie dèjà faite
                  </div>
                  <div>
                    <button
                      onClick={saveAll}
                      className="btn btn-sm btn-outline-info mb-1 w-100"
                    >
                      <i className="bi bi-floppy me-2"></i>Enregistrer les
                      modifications
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {parseInt(selectedEngin) !== 0 && (
                    <div className="text-center ">
                      <button
                        onClick={saveAll}
                        className="btn btn-sm btn-outline-success mb-1 w-100"
                      >
                        <i className="bi bi-floppy me-2"></i>Enregistrer la
                        saisie
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <small>Total HIM : {totalHim}</small>
              <br />
              <small>Toal NI : {totalNi}</small>
            </div>
          </div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Panne</th>
                <th>HIM</th>
                <th>NI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pannesLists?.map((him, index) => (
                <tr key={index}>
                  <td>{him.panne_name}</td>
                  <td>{him.him}</td>
                  <td>{him.ni}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        onClick={(e) => {
                          // e.stopPropagation();
                          handleDeleteHim(him);
                        }}
                        className="btn btn-sm btn-outline-danger rounded-pill"
                      >
                        X
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SaisieRje;
