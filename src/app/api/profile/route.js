import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfos";

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { name, ...otherUserInfo } = data;
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  //update user
  await User.updateOne({ email }, { name });
  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });

  return Response.json(true);
};

export const GET = async () => {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return Response.json({});
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return Response.json({ ...user, ...userInfo });
};
