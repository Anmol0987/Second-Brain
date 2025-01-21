import express from 'express';
import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from "./db";
import { jwtSecret } from './config';
import { authMiddleware } from './middleware';
import { hashGeneration } from './util';
import cors from 'cors';

const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').nonempty(),
    password: z.string().min(6, 'Password must be at least 6 characters').nonempty()
})



app.post("/api/v1/signup", async (req: Request, res: Response) => {
    try {
        const result = signupSchema.safeParse(req.body);
        console.log(result)
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
        console.log("here")
        res.json({
            message: "User signed up"
        })
    } catch (e) {
        console.log("heree")
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post('/api/v1/signin', async (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({ username: username });

    if (existingUser && existingUser.password && bcrypt.compareSync(password, existingUser.password)) {
        const token = jwt.sign({ id: existingUser._id }, jwtSecret);
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
app.post('/api/v1/content', authMiddleware, async (req: Request, res: Response) => {

    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    await ContentModel.create({
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

});
app.get('/api/v1/content', authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const userId = req.userId;
    const contents = await ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(contents);

});
app.delete('/api/v1/content', authMiddleware, async (req: Request, res: Response) => {

    const contentId = req.body.contentId;
    await ContentModel.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
});
app.post('/api/v1/brain/share', authMiddleware, async (req: Request, res: Response) => {
    const { share } = req.body;

    if (share) {
        //@ts-ignore
        const existingHash = await LinkModel.findOne({ userId: req.userId });
        if (existingHash) {
            res.json({
                message: "Share link already exists",
                hash:existingHash.hash
            });
        }

        const hash = hashGeneration(20)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash
        });
        res.json({
            message: "Share link created successfully",
            link: `${req.protocol}://${req.get('host')}/api/v1/brain/${hash}`
        });
    }
    else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Share link deleted successfully"
        });
    }
 
});
app.get('/api/v1/brain/:shareLink', async (req: Request, res: Response) => {

    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            message: "Share link not found"
        });
        return;
    }
    //for content
    const content = await ContentModel.find({
        userId: link.userId
    })
    //to get user-details
    const user = await UserModel.findOne({
        _id: link.userId
    })

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



});

app.listen(3000, () => {
    console.log('Server is running onn port 3000');
});