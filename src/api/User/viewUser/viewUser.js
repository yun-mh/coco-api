import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewUser: async (_, args) => {
      const { username } = args;
      return prisma.user({ username });
    },
  },
};
