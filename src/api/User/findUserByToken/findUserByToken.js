import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    findUserByToken: async (_, args) => {
      const { token } = args;
      const user = await prisma.user({ resetSecret: token });
      console.log(user);
      return user;
    },
  },
};
