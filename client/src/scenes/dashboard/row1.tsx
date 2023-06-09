import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts"; // all from Recharts

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery(); // API call
  // console.log("data:", data); // to check data is pulling in

  // this fxn will only run when [data] changes
  const revenueExpenses = useMemo(() => {
    return (
      data && // if there is data...
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        // first element of array (there's only 1 in this object), take monthly rev and expenses
        return {
          name: month.toUpperCase().substring(0, 3), // grab name, then shorten it, format it as name
          revenue: revenue, // format as revenue
          expenses: expenses, // format as expenses
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data && // if there is data...
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        // first element of array (there's only 1 in this object), take monthly rev and expenses
        return {
          name: month.toUpperCase().substring(0, 3), // grab name, then shorten it, format it as name
          revenue: revenue, // format as revenue
          profit: (revenue - expenses).toFixed(2), // format as expenses
        };
      })
    );
  }, [data]);

  const revenue = useMemo(() => {
    return (
      data && // if there is data...
      data[0].monthlyData.map(({ month, revenue }) => {
        // first element of array (there's only 1 in this object), take monthly rev and expenses
        return {
          name: month.toUpperCase().substring(0, 3), // grab name, then shorten it, format it as name
          revenue: revenue, // format as revenue
        };
      })
    );
  }, [data]);

  return (
    <>
      {/* FIRST CHART: Revenue and Expense line graphs */}

      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="LTM revenue and expenses"
          sideText="" // TBD
        />
        {/* ResponsiveContainer from Recharts SimpleAreaChart code example */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            {/* <CartesianGrid strokeDasharray="2 2" />  gridlines can be removed */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={{ strokeWidth: "0" }}
              tickLine={false}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />

            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.tertiary[500]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* SECOND CHART: Revenue and Expense Line Graph */}

      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Topline revenue vs net profit"
          sideText="Annual Profit Margin: 4%"
        />
        {/* ResponsiveContainer from Recharts SimpleAreaChart code example */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[100]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* THIRD Chart */}

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing revenue by month"
          sideText="0.88% CAGR"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
