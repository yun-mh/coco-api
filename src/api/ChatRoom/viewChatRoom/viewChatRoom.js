import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewChatRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id: chatRoomId } = args;
      const { user } = request;
      const viewAuthorization = await prisma.$exists.chatRoom({
        participants_some: {
          id: user.id,
        },
      });
      if (viewAuthorization) {
        return prisma.chatRoom({ id: chatRoomId });
      } else {
        throw Error("チャットルームに対する権限がありません。");
      }
    },
  },
};
