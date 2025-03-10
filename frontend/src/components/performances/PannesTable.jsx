import { useSaisierjeStore } from "../../store/saisierjeStore";

const PannesTable = () => {
  const pannesLists = useSaisierjeStore((state) => state.pannesLists);
  const deletPanne = useSaisierjeStore((state) => state.deletPanne);

  const handleDeleteHim = (him) => {
    deletPanne(him);
  };

  return (
    <div>
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
  );
};

export default PannesTable;
