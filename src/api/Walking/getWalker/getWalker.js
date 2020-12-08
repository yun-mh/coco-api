import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, args) => {
      const { userId } = args;
      const walker = prisma.walkers({ where: { user: userId } });
      console.log(walker);
      return walker;
    },
  },
};
