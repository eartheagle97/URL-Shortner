const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.options("/api/shorten", cors());

const dynamoDBClient = new DynamoDBClient({
  region: "us-west-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

const tableName = "url_mappings";

app.post("/api/shorten", async (req, res) => {
  const { longUrl } = req.body;
  try {
    const shortCode = await generateUniqueShortCode();
    const params = {
      TableName: tableName,
      Item: marshall({
        short_code: shortCode,
        long_url: longUrl,
      }),
    };

    await dynamoDBClient.send(new PutItemCommand(params));
    res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const params = {
      TableName: tableName,
      Key: marshall({
        short_code: code,
      }),
    };

    const result = await dynamoDBClient.send(new GetItemCommand(params));
    if (result.Item) {
      res.json({ originalUrl: unmarshall(result.Item).long_url });
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error redirecting to the original URL:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

async function generateUniqueShortCode() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = 6;
  let isUnique = false;
  let shortCode = "";

  while (!isUnique) {
    shortCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortCode += characters[randomIndex];
    }

    try {
      const codeExists = await checkShortCodeExistsInDatabase(shortCode);
      if (!codeExists) {
        isUnique = true;
      }
    } catch (error) {
      console.error("Error generating short code:", error);
      throw error;
    }
  }

  return shortCode;
}

async function checkShortCodeExistsInDatabase(shortCode) {
  const params = {
    TableName: tableName,
    Key: marshall({
      short_code: shortCode,
    }),
  };

  try {
    const result = await dynamoDBClient.send(new GetItemCommand(params));
    return Boolean(result.Item);
  } catch (error) {
    console.error("Error checking short code in the database:", error);
    throw error;
  }
}

app.get("/", (req, res) => {
  res.send("URL Shortening App Backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
