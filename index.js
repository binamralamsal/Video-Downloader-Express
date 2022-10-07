const express = require("express");
const twitterGetUrl = require("twitter-url-direct");
const instagramGetUrl = require("instagram-url-direct");
const getFBInfo = require("fb-downloader");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/twitter", (req, res) => {
  res.render("twitter");
});

app.get("/instagram", (req, res) => {
  res.render("instagram");
});

app.get("/facebook", (req, res) => {
  res.render("facebook");
});

app.post("/download-twitter", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await twitterGetUrl(url);

    res.render("twitter", { videos: response.download });
  } catch (error) {
    res.render("twitter", {
      error: "Error occurred! Make sure that the URL is correct",
    });
  }
});

app.post("/download-instagram", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await instagramGetUrl(url);

    if (response.results_number < 1) throw new Error("Invalid URL");
    res.render("instagram", { video: response.url_list[0] });
  } catch (error) {
    res.render("instagram", {
      error: "Error occurred! Make sure that the URL is correct",
    });
  }
});

app.post("/download-facebook", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await getFBInfo(url);
    res.render("facebook", { response });
  } catch (error) {
    res.render("facebook", {
      error: "Error occurred! Make sure that the URL is correct",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
