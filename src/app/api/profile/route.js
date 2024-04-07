import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  //update user
  await User.updateOne({ email }, data);

  return Response.json(true);
};

export const GET = async () => {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  return Response.json(await User.findOne({ email }));
};
