import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    /**
     * ユーザ情報を編集する
     */
    editUser: async (_, args, { request, isAuthenticated }) => {
      // 認証済みのリクエストかをチェックする
      isAuthenticated(request);

      const { username, avatar } = args;
      const { user } = request;

      // ユーザ名が既に登録されているかチェック
      const usernameExist = await prisma.$exists.user({ username });
      if (usernameExist && user.username !== username) {
        throw Error("すでに登録されているユーザ名です。");
      }

      return prisma.updateUser({
        where: { id: user.id },
        data: {
          username,
          avatar,
        },
      });
    },
  },
};
