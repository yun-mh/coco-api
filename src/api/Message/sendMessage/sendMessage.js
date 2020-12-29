import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      // 各種引数の取得
      const { user } = request;
      const { roomId, message, toId, token } = args;

      // チャットルームの取得または生成
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

      // チャット相手の取得
      const participants = await prisma
        .chatRoom({ id: chatroom.id })
        .participants();
      const targetArray = participants.filter(
        (participant) => participant.id !== user.id
      );
      const target = targetArray[0];

      // メッセージの生成
      await prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: {
            id: roomId ? target.id : toId,
          },
        },
        chatroom: {
          connect: {
            id: chatroom.id,
          },
        },
        read: false,
      });

      // トークンがある場合、プッシュ通知を行う
      if (token !== "" && token !== undefined) {
        await axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title: user.username,
          body: message,
          data: {
            type: "message",
            id: toId,
          },
        });
      }

      return await prisma.updateChatRoom({
        data: { updated: new Date() },
        where: { id: chatroom.id },
      });
    },
  },
};
