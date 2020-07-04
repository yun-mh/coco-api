import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          bio,
          avatar,
        },
      });
    },
  },
};
