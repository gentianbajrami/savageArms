import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LoginGraph = ({ data }) => {
  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="hour" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="logins" stroke="#8884d8" />
    </LineChart>
  );
};

export default LoginGraph;
