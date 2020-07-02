import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id: targetId } = args;
      const { user: currentUser } = request;
      try {
        await prisma.updateUser({
          where: { id: currentUser.id },
          data: {
            following: {
              connect: {
                id: targetId,
              },
            },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
