import { clientCache } from "@middlewares/cache";
import { otakudesuInfo, otakudesuRoute } from "@otakudesu/index";
import { samehadakuInfo, samehadakuRoute } from "@samehadaku/index";
import mainRoute from "@routes/mainRoute";
import errorHandler from "@middlewares/errorHandler";
import animeConfig from "@configs/animeConfig";
import path from "path";
import express from "express";
import cors from "cors";

const { PORT } = animeConfig;
const app = express();

const corsOptions = {
  origin: function (origin: any, callback: any) {
    const allowedOrigins = ['https://c.tuxedolabs.xyz', 'http://localhost:7878'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// MIDDLEWARES
app.use('*', cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(clientCache(1));

// RUTE SUMBER
app.use(otakudesuInfo.baseUrlPath, otakudesuRoute);
app.use(samehadakuInfo.baseUrlPath, samehadakuRoute);

// RUTE UTAMA
app.use(mainRoute);

// ERROR HANDLER
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER BERJALAN DI http://localhost:${PORT}`);
});
