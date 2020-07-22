import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar } = args;
      const { user } = request;
      await prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          avatar,
        },
      });
      return true;
    },
  },
};
