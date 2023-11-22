const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");
const res = require("express/lib/response");
const req = require("express/lib/request");

const URI =
  "mongodb+srv://***********************";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up on the port");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  //   cl
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrl", async (req, res) => {
  await shortUrl.create({ fullUrl: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:Url", async (req, res) => {
  //   console.log(req.params.Url);
  const shor = await shortUrl.findOne({ shorUrl: req.params.Url });
  // console.log(shor);s
  if (shor === null) res.sendStatus(404);

  shor.clicks++;

  shor.save();
  res.redirect(shor.fullUrl);
});
