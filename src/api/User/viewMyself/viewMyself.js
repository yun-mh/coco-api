import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewMyself: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      const dogs = await prisma.user({ id: user.id }).dogs();
      return {
        user: userProfile,
        posts,
        dogs,
      };
    },
  },
};
