import { useState } from "react";
import { Link } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  /*
  useTheme is grabbing theme settings we created
  grabbing the palette object in theme.ts file
  */
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard"); // determines what page we are on to highlight text

  return (
    <FlexBetween
      marginBottom="0.25rem"
      padding="0.5rem 0rem"
      color={palette.grey[300]}
    >
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <QueryStatsIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Finance Charts
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
