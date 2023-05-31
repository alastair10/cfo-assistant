import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const Row2 = (props: Props) => {
  const { palette } = useTheme(); // get the colors

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  // console.log(data); // check to see if we get data back

  // this fxn will only run when [data] changes
  const operationalExpenses = useMemo(() => {
    return (
      operationalData && // if there is data...
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          // first element of array (there's only 1 in this object), take monthly rev and expenses
          return {
            name: month.substring(0, 3), // grab name, then shorten it, format it as name
            "Operational Expenses": operationalExpenses, // format as operationalExpenses
            "Non Operational Expenses": nonOperationalExpenses, // format as nonOpExpenses
          };
        }
      )
    );
  }, [operationalData]);

  return (
    <>
      {/* FIRST CHART */}

      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-operational Expenses"
          sideText="+9%"
        />
        {/* ResponsiveContainer from Recharts SimpleAreaChart code example */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
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
              orientation="left"
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default Row2;
