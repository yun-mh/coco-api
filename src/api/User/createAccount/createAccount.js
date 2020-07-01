import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { avatar, username, email, password, bio = "" } = args;
      const encrypted = await encryptPassword(password);
      const user = await prisma.createUser({
        avatar,
        username,
        email,
        password: encrypted,
        bio,
      });
      return user;
    },
  },
};
