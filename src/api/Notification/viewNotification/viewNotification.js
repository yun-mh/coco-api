import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewNotification: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.notifications({
        where: {
          user: {
            id: user.id,
          },
        },
        orderBy: "createdAt_DESC",
      });
    },
  },
};
