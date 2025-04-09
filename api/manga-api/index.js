require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const manga = require("./routers/manga");
const chapter = require("./routers/chapter");
const cors = require("cors");
const helmet = require("helmet");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['https://c.tuxedolabs.xyz', 'http://localhost:7878'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use('*', cors(corsOptions));
app.use(helmet());
app.use("/api", manga);
app.use(express.static("./public"));
app.use("/api/chapter", chapter);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "api path not found",
  });
});
// listening
app.listen(PORT, () => {
  console.log("Listening on PORT:" + PORT);
});
