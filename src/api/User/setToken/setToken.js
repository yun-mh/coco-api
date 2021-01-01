import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    /**
     * モバイルのプッシュ通知用のトークンをデータベースに保存する
     */
    setToken: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      const { token } = args;
      const { user } = request;

      return prisma.updateUser({
        where: { id: user.id },
        data: {
          token,
        },
      });
    },
  },
};
