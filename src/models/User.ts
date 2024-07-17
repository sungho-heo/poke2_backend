import mongoose, { Document, Schema } from "mongoose";

// 타입
export interface UserType extends Document {
  nickname: string;
  email: string;
  password: string;
  fav: string[];
}

//  스키마
const UserSchema: Schema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fav: { type: [String], detault: [] },
});

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
