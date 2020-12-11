import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    insertLocation: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { walkerId, latitude, longitude } = args;

      return prisma.upsertLocation({
        where: {
          walkerId,
        },
        update: {
          latitude,
          longitude,
        },
        create: {
          walker: { connect: { id: walkerId } },
          walkerId,
          latitude,
          longitude,
        },
      });
    },
  },
};
