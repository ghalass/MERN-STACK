import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { useQuery } from "@tanstack/react-query";
import { useSaisierjeStore } from "../../store/saisierjeStore";

const HimSelects = () => {
  const createPanne = useSaisierjeStore((state) => state.createPanne);

  const [himSelect, setHimSelect] = useState({
    typepanneId: "",
    panneId: "",
  });

  // GET ALL TYPEPANNES
  const { getAll: getTypepannes } = useCrud("/typepannes");
  const { data: typepannes } = useQuery({
    queryKey: ["typepannesList"],
    queryFn: getTypepannes,
  });
  // GET ALL PANNES
  const { getAll: getPannes } = useCrud("/pannes");
  const { data: pannes } = useQuery({
    queryKey: ["pannesList"],
    queryFn: getPannes,
  });

  const [filteredPannes, setFilteredPannes] = useState([]);
  useEffect(() => {
    if (pannes && pannes.length > 0 && himSelect.typepanneId) {
      const filtered = pannes.filter(
        (panne) => panne.typepanneId === parseInt(himSelect.typepanneId)
      );
      setFilteredPannes(filtered);
    } else {
      setFilteredPannes([]);
    }
  }, [himSelect.typepanneId, pannes]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHimSelect((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex gap-1 align-items-center justify-content-around">
      <div className="form-floating mb-2">
        <select
          className={`form-select`}
          id={"typepanneId"}
          name="typepanneId"
          value={himSelect.typepanneId}
          onChange={handleChange}
        >
          <option value="">Choisir Type de Panne</option>
          {typepannes?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={"typepanneId"}>Type de Panne</label>
      </div>

      <div className="form-floating mb-2">
        <select
          className={`form-select`}
          id={"panneId"}
          name="panneId"
          value={himSelect.panneId}
          onChange={handleChange}
        >
          <option value="">Choisir une Panne</option>
          {filteredPannes?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={"panneId"}>Panne</label>
      </div>

      <div>
        <button
          onClick={handleAddPanne}
          className="btn btn-sm btn-outline-info rounded-pill"
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default HimSelects;
