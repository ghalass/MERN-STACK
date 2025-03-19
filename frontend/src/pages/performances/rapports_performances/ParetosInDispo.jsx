import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const ParetosInDispo = () => {
  const data = [
    { name: "Jan", val: 400 },
    { name: "Feb", val: 300 },
    { name: "Mar", val: 500 },
    { name: "Mar", val: 500 },
    { name: "Mar", val: 500 },
    { name: "Mar", val: 500 },
  ];
  return (
    <div>
      <h6>Chart</h6>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="val" fill="#8884d8">
            {/* Ajout des valeurs sur les barres */}
            <LabelList
              dataKey="val"
              position="top"
              fill="black"
              fontSize={14}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParetosInDispo;
