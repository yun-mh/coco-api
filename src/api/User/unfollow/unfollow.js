import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    /**
     * 対象ユーザをアンフォローする
     */
    unfollow: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      const { id: targetId } = args;
      const { user: currentUser } = request;

      // アンフォロー処理
      try {
        await prisma.updateUser({
          where: { id: currentUser.id },
          data: {
            following: {
              disconnect: {
                id: targetId,
              },
            },
          },
        });

        return true;
      } catch {
        return false;
      }
    },
  },
};
