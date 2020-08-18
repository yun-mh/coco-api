import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { avatar, username, email, password } = args;
      const user = await prisma.$exists.user({ email });
      console.log(user);
      if (user) {
        return false;
      }

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
