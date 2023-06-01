import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React from "react";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  // Pull in Theme
  const { palette } = useTheme();
  const pieColors = [palette.primary[500], palette.primary[800]];
  // Pull in required Data
  const { data: transactionData } = useGetTransactionsQuery(); // pull in the data
  // console.log(transactionData) // test to see data is pulling in 50 txns
  const { data: productData } = useGetProductsQuery(); // pull in product data
  const { data: kpiData } = useGetKpisQuery(); // pull in kpi data

  // Grab expense by category in kpi data, loop through and paste number
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses; // set total expenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        // get key and value
        ([key, value]) => {
          console.log(kpiData[0].expensesByCategory);
          return [
            {
              name: key,
              value: value,
            },
            //
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
              // value: totalExpenses,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  // define column data for the products table
  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `£${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `£${params.value}`,
    },
  ];

  // define column data for the transactions table
  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `£${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.35,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<String>).length,
    },
  ];

  return (
    <>
      {/* FIRST TABLE: PRODUCTS*/}
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* SECOND TABLE: TXNS */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* THIRD CHART: Expense By Category with Pie Charts */}
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Expense Breakdown By Category"
          sideText="Total Expenses: £71,000"
        />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {/* pieChartData has 3 elements so we loop through 3 times to make 3 pie charts */}
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={85}>
                <Pie
                  data={data}
                  stroke="none" // removed border
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* FOURTH CHART: Bar Graph */}
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall IPO Readiness" sideText="+75%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="75%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Have a great CFO in place, Build out the capabilities of your finance
          team , Invest in robust internal administrative and financial systems,
          Build the right board, Start meeting with select bankers early, Start
          Clean up your cap table, Communicate (carefully) with your company
          about IPO plans, Hire the right accounting firm, Resolve
          company corporate governance, Develop a long-term financial model, etc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
