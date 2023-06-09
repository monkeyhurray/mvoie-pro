import bcrypt from "bcrypt";
import mongoose, { Document } from "mongoose";

export interface DBUser extends Document {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  videos: string[];
}

const userSchema = new mongoose.Schema<DBUser>({
  id: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model<DBUser>("User", userSchema);
export default User;
