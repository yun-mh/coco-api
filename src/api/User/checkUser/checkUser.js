import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    checkUser: async (_, args) => {
      const { email } = args;
      return prisma.user({ email });
    },
  },
};
