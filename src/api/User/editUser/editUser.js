import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, avatar } = args;
      const { user } = request;

      const usernameExist = await prisma.$exists.user({ username });
      if (usernameExist && (user.username !== username)) {
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
