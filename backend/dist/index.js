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
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const saltRounds = 10;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters').nonempty(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters').nonempty()
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const result = signupSchema.safeParse(req.body);
        console.log(result);
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
        console.log("here");
        res.json({
            message: "User signed up"
        });
    }
    catch (e) {
        console.log("heree");
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
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content created successfully"
    });
}));
app.get('/api/v1/content', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const contents = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(contents);
}));
app.delete('/api/v1/content', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const link = req.body.link;
    console.log(link);
    const response = yield db_1.ContentModel.deleteOne({
        link,
        //@ts-ignore
        userId: req.userId
    });
    res.json(response);
}));
app.post('/api/v1/brain/share', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (share) {
            //@ts-ignore
            const existingHash = yield db_1.LinkModel.findOne({ userId: req.userId });
            console.log("-----", existingHash);
            if (existingHash && existingHash.hash) {
                res.json({
                    message: "Share link already exists",
                    link: `http://localhost:5173/brain/${existingHash.hash}`
                });
                return;
            }
            const hash = (0, util_1.hashGeneration)(20);
            console.log("++++++++", hash);
            const link = yield db_1.LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash
            });
            console.log("+-+-+-+-", link);
            res.json({
                message: "Share link created successfully",
                link: `http://localhost:5173/brain/${link.hash}`
            });
            return;
        }
        else {
            const deletionResult = yield db_1.LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            if (deletionResult.deletedCount > 0) {
                res.json({
                    message: "Share link deleted successfully"
                });
            }
            else {
                res.status(404).json({
                    message: "No share link found to delete"
                });
            }
            return;
        }
    }
    catch (error) {
        console.error("Error in /api/v1/brain/share endpoint:", error);
        res.status(500).json({
            message: "An error occurred"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            message: "Share link not found"
        });
        return;
    }
    //for content
    const content = yield db_1.ContentModel.find({
        userId: link.userId
    });
    //to get user-details
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        content,
        user: user.username
    });
}));
app.listen(3000, () => {
    console.log('Server is running onn port 3000');
});
