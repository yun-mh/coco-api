import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    checkUser: async (_, args) => {
      const { email } = args;
      const user = prisma.user({ email });
      console.log(user);
      if (user === null) {
        return false;
      }
      return true;
    },
  },
};
