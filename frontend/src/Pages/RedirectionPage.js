import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pattern from "../assets/pattern.svg";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Replace with your backend URL
});

function RedirectionPage() {
  const { code } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [validCode, setValidCode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the code is valid by making a request to the backend
    axiosInstance
      .get(`/${code}`)
      .then((response) => {
        const { originalUrl } = response.data;
        if (originalUrl) {
          setIsLoading(false);
          setValidCode(true);
          // The code is valid, initiate the countdown
          const countdownInterval = setInterval(() => {
            if (countdown > 1) {
              setCountdown(countdown - 1);
            } else {
              // When the countdown reaches 0, redirect the user
              window.location.href = originalUrl;
              clearInterval(countdownInterval);
            }
          }, 1000);
        } else {
          setIsLoading(false);
          // The code is not found, mark it as invalid
          setValidCode(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setValidCode(false);
      });
  }, [countdown, code]);

  return (
    <div
      style={{
        backgroundImage: `url(${Pattern})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Header />

        {isLoading ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "100px",
            }}
          >
            <CircularProgress sx={{ color: "white" }} />
          </Grid>
        ) : (
          <>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "100px",
              }}
            >
              {validCode ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                <LinkOffIcon sx={{ color: "white", fontSize: 40 }} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center", fontWeight: "600" }}
              >
                {validCode
                  ? `Your page will redirecting in ${countdown} seconds...`
                  : `Invalid Short Code.`}
              </Typography>
            </Grid>
          </>
        )}

        <Footer />
      </Container>
    </div>
  );
}

export default RedirectionPage;
