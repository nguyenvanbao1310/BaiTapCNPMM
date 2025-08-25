"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const viewEngine_1 = __importDefault(require("./config/viewEngine"));
const web_1 = __importDefault(require("./route/web"));
const configdb_1 = __importDefault(require("./config/configdb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Config app
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Config view engine
(0, viewEngine_1.default)(app);
// Init web routes
(0, web_1.default)(app);
// Connect to DB
(0, configdb_1.default)();
const port = Number(process.env.PORT) || 8088;
app.listen(port, () => {
    console.log(`✅ Backend Nodejs is running on the port: ${port}`);
});
