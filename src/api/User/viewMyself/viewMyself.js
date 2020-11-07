import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewMyself: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const res = prisma.user({ id: user.id });
      console.log(res)

      return res;
    },
  },
};
