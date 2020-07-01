import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
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
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
