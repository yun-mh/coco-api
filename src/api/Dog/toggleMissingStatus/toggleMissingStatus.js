import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleMissingStatus: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, isMissed } = args;
      const { user } = request;
      const dog = await prisma.$exists.dog({ id, user: { id: user.id } });
      if (dog) {
        await prisma.updateDog({
            data: { isMissed },
            where: { id },
          });
        return true;
      } else {
        return false;
      }
    },
  },
};
