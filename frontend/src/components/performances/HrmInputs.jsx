import { useSaisierjeStore } from "../../store/saisierjeStore";

const HrmInputs = () => {
  const saisiehrm = useSaisierjeStore((state) => state.saisiehrm);

  return (
    <div className="d-flex gap-1">
      <div className="form-floating mb-2">
        <input
          type="number"
          className={`form-control`}
          id="hrm"
          name="hrm"
          placeholder="HRM"
          value={saisiehrm?.hrm}
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
          name="id"
          placeholder="Id"
          value={saisiehrm?.id}
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
  );
};

export default HrmInputs;
