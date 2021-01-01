import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    /**
     * 対象ユーザの情報を取得する
     */
    viewUser: async (_, args) => {
      const { id } = args;

      return prisma.user({ id });
    },
  },
};
