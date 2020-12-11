import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    insertLocation: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { walkerId, latitude, longitude } = args;

      const { user } = request;

      return prisma.upsertWalker({
        where: {
          id: walkerId,
        },
        update: {
          latitude,
          longitude,
        },
        create: {
          user: { connect: { id: user.id } },
          latitude,
          longitude,
          isWalking: true,
        },
      });
    },
  },
};
