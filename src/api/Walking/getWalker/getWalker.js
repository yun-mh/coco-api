import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.walkers({ where: { user: { id: user.id } } });
    },
  },
};
