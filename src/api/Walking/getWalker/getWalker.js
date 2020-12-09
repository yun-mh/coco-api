import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalker: async (_, __, { request, isAuthenticated }) => {
      // 認証確認
      isAuthenticated(request);

      // ユーザ情報の取得
      const { user } = request;

      // 散歩者情報の検索
      const res = prisma.walkers({
        where: { user: { id: user.id } },
        orderBy: "createdAt_DESC",
      });

      // 散歩者情報が存在すれば一番最新の情報一つを、なければnullをリターンする
      if (res.length === 0) {
        return null;
      }
      return res[0];
    },
  },
};
