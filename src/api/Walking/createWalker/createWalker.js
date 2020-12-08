import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createWalker: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user);
      return prisma.createWalker({
        user: { connect: { id: user.id } },
      });
    },
  },
};
