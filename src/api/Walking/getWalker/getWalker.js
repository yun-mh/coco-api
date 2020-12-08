import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, args) => {
      const { userId } = args;
      return prisma.walker({ user: userId });
    },
  },
};
