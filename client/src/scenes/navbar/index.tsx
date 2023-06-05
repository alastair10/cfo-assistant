import { useState } from "react";
import { Link } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

const Navbar = () => {
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
          CFO Assistant
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">

        <Box sx={{ "&:hover": { color: palette.tertiary[500] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            dashboard
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.tertiary[500] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit"
            }}
          >
            predictions
          </Link>
        </Box>

      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
