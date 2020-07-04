import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let chatroom;
      if (roomId === undefined) {
        if (user.id !== toId) {
          chatroom = await prisma.createChatRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }],
            },
          });
        }
      } else {
        chatroom = await prisma.chatRoom({ id: roomId });
      }
      if (!chatroom) {
        throw Error("チャットルームが存在しません。");
      }
      const participants = await prisma
        .chatRoom({ id: chatroom.id })
        .participants();
      const getTo = participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId,
          },
        },
        chatroom: {
          connect: {
            id: chatroom.id,
          },
        },
      });
    },
  },
};
