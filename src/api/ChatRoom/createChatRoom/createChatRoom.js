import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createChatRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId } = args;

      if (user.id !== toId) {
        return await prisma.createChatRoom({
          participants: {
            connect: [{ id: toId }, { id: user.id }],
          },
        });
      }
    },
  },
};
