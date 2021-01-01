import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    /**
     * ユーザの本人情報を取得する
     */
    viewMyself: async (_, __, { request, isAuthenticated }) => {
      // 認証済かチェック
      isAuthenticated(request);

      const { user } = request;

      return prisma.user({ id: user.id });
    },
  },
};
