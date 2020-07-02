import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewUser: (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
