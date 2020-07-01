import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const comment = await prisma.$exists.comment({
        id,
        user: { id: user.id },
      });
      if (comment) {
        return prisma.deleteComment({ id });
      } else {
        throw Error("アクセスできません");
      }
    },
  },
};
