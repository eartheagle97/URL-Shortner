import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Pattern from "../assets/pattern.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Replace with your backend URL
});

function ShortenPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!longUrl || !urlPattern.test(longUrl)) {
      // Invalid URL
      setShortUrl("");
      alert("Invalid URL");
      return;
    }
    try {
      const response = await axiosInstance.post("/api/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert("Text copied to clipboard!");
  };

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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{ color: "white", textAlign: "center", fontWeight: "600" }}
              mb={2}
            >
              The Simplest URL Shortner You Were Waiting For
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              id="filled-basic"
              placeholder="Enter Long Link Here"
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              sx={{
                width: "100%",
                backgroundColor: "#1E1E20",
                borderRadius: "10px",
                "& input": {
                  color: "white",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsertLinkIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              aria-label="delete"
              size="large"
              sx={{
                width: "56px",
                height: "56px",
                padding: "10px",
                marginLeft: "10px",
                border: "1px solid white",
                borderRadius: "10px",
              }}
              onClick={handleSubmit}
            >
              <RefreshIcon fontSize="inherit" sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              id="filled-basic"
              variant="outlined"
              value={shortUrl}
              sx={{
                width: "100%",
                backgroundColor: "#1E1E20",
                borderRadius: "10px",
                "& input": {
                  color: "white",
                },
              }}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "white",
                height: "56px",
                borderColor: "white",
                marginLeft: "10px",
              }}
              startIcon={<ContentCopyIcon />}
              onClick={handleCopyClick}
            >
              Copy
            </Button>
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </div>
  );
}

export default ShortenPage;
