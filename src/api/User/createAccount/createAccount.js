import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { avatar, username, email, password, bio = "" } = args;
      const user = await prisma.createUser({
        avatar,
        username,
        email,
        password,
        bio,
      });
      return user;
    },
  },
};
