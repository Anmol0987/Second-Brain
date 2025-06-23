import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to MongoDB...");
console.log("Mongo URI:", process.env.MONGO_URI);
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
mongoose.connect(uri);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
