import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const toId = await prisma
        .post({ id: postId })
        .user()
        .id();
      const findTargetOption = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id: postId,
            },
          },
        ],
      };

      try {
        const likeIsPressed = await prisma.$exists.like(findTargetOption);
        if (likeIsPressed) {
          await prisma.deleteManyLikes(findTargetOption);
        } else {
          await prisma.createLike({
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
            post: {
              connect: {
                id: postId,
              },
            },
            type: "LIKE",
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};