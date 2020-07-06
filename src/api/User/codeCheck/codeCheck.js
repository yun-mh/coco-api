import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    codeCheck: async (_, args) => {
      const { code, email } = args;
      const user = await prisma.user({ email });
      if (code === user.resetSecret) {
        return true;
      }
      return false;
    },
  },
};
