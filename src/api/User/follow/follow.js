import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: targetId } = args;
      const { user: currentUser } = request;
      try {
        await prisma.updateUser({
          where: { id: currentUser.id },
          data: {
            following: {
              connect: {
                id: targetId,
              },
            },
          },
        });
        await prisma.createNotification({
          from: {
            connect: {
              id: currentUser.id,
            },
          },
          user: {
            connect: {
              id: targetId,
            },
          },
          type: "FOLLOW",
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
