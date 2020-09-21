import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    findUserByToken: async (_, args) => {
      const { token } = args;
      return prisma.user({ resetSecret: token });
    },
  },
};
