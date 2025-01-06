"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const saltRounds = 10;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters').nonempty(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters').nonempty()
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: result.error.errors
            });
        }
        const password = (_a = result.data) === null || _a === void 0 ? void 0 : _a.password;
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        if (((_b = result.data) === null || _b === void 0 ? void 0 : _b.password) === undefined) {
            throw new Error('Password is required');
        }
        const hashedPassword = bcrypt_1.default.hashSync(result.data.password, salt);
        yield db_1.UserModel.create({
            username: (_c = result.data) === null || _c === void 0 ? void 0 : _c.username,
            password: hashedPassword
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({ username: username });
    if (existingUser && existingUser.password && bcrypt_1.default.compareSync(password, existingUser.password)) {
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.jwtSecret);
        res.json({
            message: 'User signed in',
            token: token
        });
    }
    else {
        res.status(401).json({
            message: 'Invalid username or password'
        });
    }
}));
app.post('/api/v1/content', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content created successfully"
    });
}));
app.get('/api/v1/content', (req, res) => {
});
app.delete('/api/v1/content', (req, res) => {
});
app.get('/api/v1/brain/share', (req, res) => {
});
app.get('/api/v1/brain/:shareLink', (req, res) => {
});
app.listen(3000, () => {
    console.log('Server is running onn port 3000');
});
