import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewChatRooms: (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.chatRooms({
        where: {
          participants_some: {
            id: user.id,
          },
        },
        orderBy: "updatedAt_DESC",
      });
    },
  },
};
