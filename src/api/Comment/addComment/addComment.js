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
      return true;
    },
  },
};
