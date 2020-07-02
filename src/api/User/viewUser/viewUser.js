import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewUser: async (_, args) => {
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      const dogs = await prisma.user({ id }).dogs();
      return {
        user,
        posts,
        dogs,
      };
    },
  },
};
