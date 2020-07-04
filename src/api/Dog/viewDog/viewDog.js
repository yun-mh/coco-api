import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewDog: async (_, args) => {
      const { id } = args;
      return prisma.dog({ id });
    },
  },
};
