import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    passwordChange: async (_, args) => {
      const { email, password } = args;
      const encrypted = await encryptPassword(password);
      try {
        await prisma.updateUser({
          data: { password: encrypted, resetSecret: "" },
          where: { email },
        });
      } catch (error) {
        console.warn(error);
        return false;
      }
      return true;
    },
  },
};
