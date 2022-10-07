const express = require("express");
const twitterGetUrl = require("twitter-url-direct");
const instagramGetUrl = require("instagram-url-direct");
const getFBInfo = require("fb-downloader");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/download-twitter", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await twitterGetUrl(url);
    if (!response.found) throw new Error("Invalid URL");

    res.json(response);
  } catch (error) {
    res.json({ found: false, error: "Invalid URL" });
  }
});

app.post("/download-instagram", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await instagramGetUrl(url);

    if (response.results_number < 1) throw new Error("Invalid URL");
    res.json({ found: true, download: response });
  } catch (error) {
    res.json({ found: false, error: "Invalid URL" });
  }
});

app.post("/download-facebook", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await getFBInfo(url);
    res.json({ found: true, download: response });
  } catch (error) {
    res.json({ found: false, error: "Invalid URL" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
