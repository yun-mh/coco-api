import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    /**
     * ユーザを検索する
     */
    searchUser: async (_, args) =>
      prisma.users({
        where: {
          OR: [{ username_contains: args.term }, { email_contains: args.term }],
        },
      }),
  },
};
