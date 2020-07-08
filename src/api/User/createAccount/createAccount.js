import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { avatar, username, email, password } = args;
      const encrypted = await encryptPassword(password);
      await prisma.createUser({
        avatar,
        username,
        email,
        password: encrypted,
      });
      return true;
    },
  },
};
