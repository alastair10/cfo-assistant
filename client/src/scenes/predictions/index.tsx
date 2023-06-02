import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Button } from "@mui/material";
import { useTheme, Box, Typography } from "@mui/material";
import { bgcolor } from "@mui/system";
import React, { useState } from "react";

type Props = {};

const Predictions = (props = Props) => {
  // get colours
  const { palette } = useTheme();
  // set state to control button
  const [isPredictions, setIsPredictions] = useState(false);

  //get data
  const { data: kpiData } = useGetKpisQuery();

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
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show predicted revenue for next year
        </Button>
      </FlexBetween>
    </DashboardBox>
  );
};

export default Predictions;
