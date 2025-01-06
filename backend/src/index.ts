import express from 'express';
import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from "./db";
import { jwtSecret } from './config';
import { authMiddleware } from './middleware';

const saltRounds = 10;

const app = express();
app.use(express.json());

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').nonempty(),
    password: z.string().min(6, 'Password must be at least 6 characters').nonempty()
})



app.post("/api/v1/signup", async (req: Request, res : Response) => {
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: result.error.errors
            })
        }
        const password = result.data?.password;
        const salt = bcrypt.genSaltSync(saltRounds);
        if (result.data?.password === undefined) {
            throw new Error('Password is required');
        }
        const hashedPassword = bcrypt.hashSync(result.data.password, salt);
        
        await UserModel.create({
            username: result.data?.username,
            password: hashedPassword
        })
        res.json({
            message: "User signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post('/api/v1/signin',async (req: Request, res : Response) => {

    const username = req.body.username;
    const password = req.body.password;
    const existingUser =await UserModel.findOne({ username: username});

    if (existingUser && existingUser.password && bcrypt.compareSync(password, existingUser.password)) {
        const token = jwt.sign({ id:existingUser._id }, jwtSecret);
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

});
app.post('/api/v1/content',authMiddleware,async (req: Request, res: Response) => {

    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    });
    res.json({
        message:"Content created successfully"
    });

});
app.get('/api/v1/content',authMiddleware,async (req: Request, res : Response) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({userId: userId}).populate("userId", "username");
    res.json(content);

});
app.delete('/api/v1/content',authMiddleware,async (req: Request, res : Response) => {

    const contentId = req.body.contentId;
    await ContentModel.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
});
app.get('/api/v1/brain/share', (req: Request, res : Response) => {

});
app.get('/api/v1/brain/:shareLink', (req: Request, res : Response) => {

});

app.listen(3000, () => {
    console.log('Server is running onn port 3000');
});