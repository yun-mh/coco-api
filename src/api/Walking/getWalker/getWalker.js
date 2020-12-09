import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const res = prisma.walkers({
        where: { user: { id: user.id } },
        orderBy: "createdAt_DESC",
      });
      console.log(res);
      return res;
    },
  },
};
