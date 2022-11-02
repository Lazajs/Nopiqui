"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_1 = __importDefault(require("./db/mongo"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const contact_1 = __importDefault(require("./routes/contact"));
const notes_1 = __importDefault(require("./routes/notes"));
const logout_1 = __importDefault(require("./routes/logout"));
const handleError_1 = __importDefault(require("./routes/middlewares/handleError"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
require("./db/models/Note");
const notFound_1 = __importDefault(require("./routes/notFound"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    credentials: true,
    origin: false,
};
mongo_1.default
    .then(() => console.log('Succesfully connected to DB'))
    .catch(ConnectToDBError => console.log({ ConnectToDBError }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.static('../client/build'));
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/contact', contact_1.default);
app.use('/notes', notes_1.default);
app.use('/logout', logout_1.default);
app.use('404', notFound_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../client/build', 'index.html'));
});
app.use(handleError_1.default);
app.listen(process.env.PORT || 3001, () => console.log('listening'));
