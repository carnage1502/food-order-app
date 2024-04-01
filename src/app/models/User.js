const { Schema, model, models } = require("mongoose");
import bcrypt from "bcrypt";

const UserScehma = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("Password must contain atleast 5 characters");
          return false;
        }
        pass;
      },
    },
  },
  { timestamps: true }
);

UserScehma.post("validate", (user) => {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPassword, salt);
});

export const User = models?.User || model("User", UserScehma);
