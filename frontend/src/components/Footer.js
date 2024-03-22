import { Grid, Link, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Grid item xs={12} mt={32}>
      <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
        &copy; {new Date().getFullYear()} |{" "}
        <Link href="https://github.com/eartheagle97" color='inherit' underline="none"
>Kairav Patel</Link> | All Rights Reserved.
      </Typography>
    </Grid>
  );
};

export default Footer;
