import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getWalkers: async (_, __, { request, isAuthenticated }) => {
      // 認証確認
      isAuthenticated(request);

      // ユーザ情報の取得
      const { user } = request;

      // 散歩者情報の検索(リクエスト者を除く)
      const res = prisma.walkers({
        where: { user: { id_not: user.id } },
      });

      // 結果をリターンする
      return res;
    },
  },
};
