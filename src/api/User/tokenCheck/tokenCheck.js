import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    tokenCheck: async (_, args) => {
      const { token } = args;
      const exists = await prisma.$exists.user({ resetSecret: token });
      console.log(exists);
      if (exists) {
        return true;
      }
      return false;
    },
  },
};
