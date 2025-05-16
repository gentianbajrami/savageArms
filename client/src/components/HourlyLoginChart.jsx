import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const HourlyLoginChart = ({ data }) => {
  const fullData = Array.from({ length: 24 }, (_, hour) => {
    const found = data.find((item) => item._id.hour === hour);
    return { hour: `${hour}:00`, logins: found ? found.count : 0 };
  });

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={fullData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="logins" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyLoginChart;
