import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    insertLocation: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { walkerId, latitude, longitude } = args;

      return prisma.createLocation({
        walker: { connect: { id: walkerId } },
        latitude,
        longitude,
      });
    },
  },
};
