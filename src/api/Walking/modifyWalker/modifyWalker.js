import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyWalker: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { walkerId, isWalking } = args;

      return prisma.updateWalker({
        data: {
          isWalking,
        },
        where: {
          id: walkerId,
        },
      });
    },
  },
};
