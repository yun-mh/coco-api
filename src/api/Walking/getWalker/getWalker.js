import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, args) => {
      const { userId } = args;
      const walker = prisma.user({ id: userId }).walker();
      console.log(walker);
      return walker;
    },
  },
};
