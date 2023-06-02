import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Button } from "@mui/material";
import { useTheme, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression"; // format that regression takes

const Predictions = () => {
  // get colours
  const { palette } = useTheme();
  // set state to control button
  const [isPredictions, setIsPredictions] = useState(false);

  //get data
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    // if theres no data, just make an empty array to avoid issues
    if(!kpiData) return [];
    
    // grab monthly data from kpiData
    const monthData = kpiData[0].monthlyData;

    // format the monthly data we pull (Array<DataPoint> is needed to format the data corretly when passing it into regressionLine below)
    const formatted: Array<DataPoint> = monthData.map(
      // grab revenue as well as its index
      // index will represent the months Jan-Dec
      ({ revenue }, i: number) => {
        return [i, revenue]
      }
    );
      const regressionLine = regression.linear(formatted);

      // now we cycle through the monthlydata to get each point for the line
      // month aka [1], and the revenue aka [1] from [i][1]
      return monthData.map(({ month, revenue }, i: number) => {
        return {
          name: month,
          "Actual Revenue": revenue,
          "Regression Line":  regressionLine.points[i][1],
          "Predicted Revenue (in 12 months)": regressionLine.predict(i+12)[1] // represents reveneu next year
        }
      })

  }, [kpiData])

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="0.3rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Reported revenue and projected revenue based on simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.secondary[500],
            backgroundColor: palette.grey[800],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show predicted revenue for next year
        </Button>
      </FlexBetween>

      {/* LINE CHART */}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 30000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `£${v}`}
          >
            <Label
              value="Revenue in GBP"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue (in 12 months)"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
