import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createChatRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId } = args;

      const exist = await prisma.$exists.chatRoom({
        participants_every: {
          id_in: [user.id, toId]
        },
      });

      if (!exist) {
        if (user.id !== toId) {
          return await prisma.createChatRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }],
            },
          });
        }
      } else {
        const result =  await prisma.chatRooms({ 
          where: {
            participants_every: {
              id_in: [user.id, toId]
            }
          }
        });

        console.log(result)
        return result
      }
    },
  },
};
