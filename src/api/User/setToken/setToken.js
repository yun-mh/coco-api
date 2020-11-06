import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    setToken: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { token } = args;
      const { user } = request;

    //   console.log(token, user)

      return prisma.updateUser({
        where: { id: user.id },
        data: {
          token,
        },
      });
    },
  },
};
