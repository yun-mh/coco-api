import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId, text } = args;
      const { user } = request;
      const toId = await prisma
        .post({ id: postId })
        .user()
        .id();

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

      console.log(1);

      // トークンがある場合、プッシュ通知を行う
      if (token !== "" && token !== undefined) {
        await axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title: `${user.username}さんがコメントを登録しました。`,
          body: `${text}`,
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
