import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: targetId } = args;
      const { user: currentUser } = request;
      try {
        await prisma.updateUser({
          where: { id: currentUser.id },
          data: {
            following: {
              disconnect: {
                id: targetId,
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
