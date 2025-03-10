import { useSaisierjeStore } from "../../store/saisierjeStore";

const PannesTotal = () => {
  const totalHim = useSaisierjeStore((state) => state.totalHim);
  const totalNi = useSaisierjeStore((state) => state.totalNi);
  return (
    <div className="card">
      <div className="card-body">
        <small>Total HIM : {totalHim}</small>
        <br />
        <small>Toal NI : {totalNi}</small>
      </div>
    </div>
  );
};

export default PannesTotal;
