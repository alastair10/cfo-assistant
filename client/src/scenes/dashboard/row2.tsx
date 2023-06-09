import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

// hardcoding the data for the pieChart
const pieData = [
  { name: "Group A", value: 200 },
  { name: "Group B", value: 83 },
];

const Row2 = () => {
  const { palette } = useTheme(); // get the colors
  const pieColors = [palette.primary[300], palette.primary[800]];

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  // console.log(data); // check to see if we get data back

  // this fxn will only run when [operationalData] changes
  const operationalExpenses = useMemo(() => {
    return (
      operationalData && // if there is data...
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.toUpperCase().substring(0, 3), // grab name, then shorten it, format it as name
            "Operational Expenses": operationalExpenses, // format as operationalExpenses
            "Non Operational Expenses": nonOperationalExpenses, // format as nonOpExpenses
          };
        }
      )
    );
  }, [operationalData]);

  // this fxn will only run when [producData] changes
  const productExpenseData = useMemo(() => {
    return (
      productData && // if there is data...
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      {/* FIRST CHART: OpEx vs Non OpEx */}

      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-operational Expenses"
          sideText="" // TBD
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
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
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

      {/* SECOND CHART: Campaign and Targets Pie Chart*/}

      <DashboardBox gridArea="e">
        <BoxHeader
          title="Campaigns and Targets"
          sideText={`${
            (pieData[0].value / (pieData[0].value + pieData[1].value)).toFixed(3) * 100
          }% Complete`}
        />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              data={pieData}
              stroke="none" // removed border
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              283k
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      {/* THIRD CHART: Scatterplot product margin*/}

      <DashboardBox gridArea="f">
        <BoxHeader
          title="Product Margins: price vs expense"
          sideText="" // TBD
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -20,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `£${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `£${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `£${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
