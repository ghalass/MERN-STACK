import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
  //
  LineChart,
  Line,
} from "recharts";
const Chart = ({ data, xDataKey, barDataKey, type = "bar" }) => {
  return (
    <ResponsiveContainer width="100%" height={300} className={""}>
      {type === "bar" ? (
        <BarChart data={data} margin={{ bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xDataKey}
            angle={-45}
            textAnchor="end"
            tickFormatter={(tick) =>
              tick.length > 15 ? tick.slice(0, 15) + "..." : tick
            }
          />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey={barDataKey} fill="#8884d8">
            {/* Ajout des valeurs sur les barres */}
            <LabelList
              dataKey={barDataKey}
              position="top"
              fill="black"
              fontSize={12}
              fontWeight="bold"
            />
          </Bar>
        </BarChart>
      ) : (
        <LineChart data={data} margin={{ bottom: 60, right: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xDataKey}
            angle={-45}
            textAnchor="end"
            tickFormatter={(tick) =>
              tick.length > 15 ? tick.slice(0, 15) + "..." : tick
            }
          />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line type="monotone" dataKey={barDataKey} stroke="#8884d8">
            {/* Ajout des valeurs sur les barres */}
            <LabelList
              dataKey={barDataKey}
              position="top"
              fill="black"
              fontSize={12}
              fontWeight="bold"
            />
          </Line>
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
