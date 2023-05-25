import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts"; // all from Rechart

type Props = {};

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery(); // API call
  console.log("data:", data);

  // this fxn will only run when [data] changes
  const revenueExpenses = useMemo(() => {
    return (
      data && // if there is data...
      data[0].monthlyData.map(({ month, revenue, expenses }) => { // first element of array (there's only 1 in this object), take monthly rev and expenses
        return {
          name: month.substring(0, 3), // grab name, then shorten it, format it as name
          revenue: revenue, // format as revenue
          expenses: expenses, // format as expenses
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      {/* ResponsiveContainer from Recharts SimpleAreaChart code example */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default Row1;
