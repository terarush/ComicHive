"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("./middlewares/cache");
const index_1 = require("./anims/otakudesu/index");
const index_2 = require("./anims/samehadaku/index");
const mainRoute_1 = __importDefault(require("./routes/mainRoute"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const animeConfig_1 = __importDefault(require("./configs/animeConfig"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const { PORT } = animeConfig_1.default;
const app = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://c.tuxedolabs.xyz', 'http://localhost:7878'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use('*', (0, cors_1.default)(corsOptions));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cache_1.clientCache)(1));
app.use(index_1.otakudesuInfo.baseUrlPath, index_1.otakudesuRoute);
app.use(index_2.samehadakuInfo.baseUrlPath, index_2.samehadakuRoute);
app.use(mainRoute_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`SERVER BERJALAN DI http://localhost:${PORT}`);
});
