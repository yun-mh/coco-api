import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createChatRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId } = args;

      const exist = await prisma.$exists.chatRoom({
        participants: {
          connect: [{ id: toId }, { id: user.id }],
        },
      });

      console.log(exist);

      if (!exist) {
        if (user.id !== toId) {
          return await prisma.createChatRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }],
            },
          });
        }
      } else {
        return await prisma.chatRoom({ id: roomId });
      }
    },
  },
};