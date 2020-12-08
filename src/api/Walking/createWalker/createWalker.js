import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createWalker: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userId } = args;
      return prisma.createWalker({
        user: { connect: { id: userId } },
      });
    },
  },
};
