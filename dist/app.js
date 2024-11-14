"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ptzCameraRouter_1 = __importDefault(require("./routes/ptzCameraRouter"));
const mediaRouter_1 = __importDefault(require("./routes/mediaRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/ptz', ptzCameraRouter_1.default);
app.use('/api/media', mediaRouter_1.default);
app.listen(4000, () => {
    console.log('listening on port 4000');
});
//# sourceMappingURL=app.js.map