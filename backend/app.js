// app.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3001; // Choose your desired port

const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000" })); // Replace with your frontend's origin
app.options("/api/shorten", cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "urlshortner",
});

// Attempt to connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// API endpoint to shorten a URL
app.post("/api/shorten", (req, res) => {
  const { longUrl } = req.body;
  console.log("Request received:", req.body);

  // Generate a unique short code
  generateUniqueShortCode()
    .then(shortCode => {
      const query = "INSERT INTO url_mappings (long_url, short_code) VALUES (?, ?)";
      db.query(query, [longUrl, shortCode], (error, results) => {
        if (error) {
          console.error("Error shortening URL:", error);
          res.status(500).json({ error: "An error occurred" });
        } else {
          res.json({ shortUrl: `http://localhost:3001/${shortCode}` });
        }
      });
    })
    .catch(error => {
      console.error("Error generating short code:", error);
      res.status(500).json({ error: "An error occurred" });
    });
});


// API endpoint to redirect to the original URL
app.get("/:code", (req, res) => {
  const code = req.params.code;
  console.log(req.params.code)
  const query = "SELECT long_url FROM url_mappings WHERE short_code = ?";
  db.query(query, [code], (error, results) => {
    if (error) {
      console.error("Error redirecting to the original URL:", error);
      res.status(500).json({ error: "An error occurred" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "URL not found" });
    } else {
      // Send the original URL in the response
      const longUrl = results[0].long_url;
      res.json({ originalUrl: longUrl });
    }
  });
});

async function generateUniqueShortCode() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 6; // Adjust the length to your preference
  let isUnique = false;
  let shortCode = "";

  while (!isUnique) {
    shortCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters[randomIndex];
    }

    // Check if the generated short code is unique in the database
    const codeExists = await checkShortCodeExistsInDatabase(shortCode);

    if (!codeExists) {
      isUnique = true;
    }
  }

  return shortCode;
}

// Function to check if a short code exists in the database
async function checkShortCodeExistsInDatabase(shortCode) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM url_mappings WHERE short_code = ?';
    db.query(query, [shortCode], (error, results) => {
      if (error) {
        console.error('Error checking short code in the database:', error);
        reject(error);
      } else {
        const count = results[0].count;
        resolve(count > 0); // Resolve with true if the code exists, false if it doesn't
      }
    });
  });
}

app.get("/", (req, res) => {
  res.send("URL Shortening App Backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
