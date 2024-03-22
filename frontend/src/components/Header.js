import { Grid, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "100px",
      }}
    >
      <Typography
        variant="h4"
        mb={6}
        sx={{
          marginTop: "100px",
          color: "white",
          fontWeight: "800",
        }}
      >
        URL SHORTNER
      </Typography>
    </Grid>
  );
};

export default Header;
