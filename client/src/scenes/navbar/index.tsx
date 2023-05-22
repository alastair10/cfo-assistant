import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  /*
  useTheme is grabbing theme settings we created
  grabbing the palette object in theme.ts file
  */
  const { palette } = useTheme();

  return (
    <FlexBetween
      marginBottom="0.25rem"
      padding="0.5rem 0rem"
      color={palette.grey[300]}
    ></FlexBetween>
  );
};

export default Navbar;
