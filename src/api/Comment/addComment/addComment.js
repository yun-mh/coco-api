import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      // 各種引数の取得
      const { postId, text, token } = args;
      const { user } = request;
      const toId = await prisma
        .post({ id: postId })
        .user()
        .id();

      // コメント生成
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        text,
      });

      // 通知のデータを追加
      await prisma.createNotification({
        from: {
          connect: {
            id: user.id,
          },
        },
        user: {
          connect: {
            id: toId,
          },
        },
        comment: {
          connect: {
            id: comment.id,
          },
        },
        type: "COMMENT",
      });

      // トークンがある場合、プッシュ通知を行う
      if (token !== "" && token !== undefined) {
        await axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title: `コメントが登録されました。`,
          body: `${user.username}: "${text}"`,
          data: {
            type: "comment",
            id: postId,
          },
        });
      }
      return true;
    },
  },
};
