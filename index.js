const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors")

config();
app.use(express.json());
app.use(cors())

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGODB__URL)
  .then(() => console.log("MongoDb is connected"))
  .catch(() => console.log("MongoDb is not connected"));

app.get("/", async (req, res) => {
  res.json("app is running");
});

//Routers
const Collector = require("./routers/collector");

app.use("/collector", Collector);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(PORT + " is listened"));
