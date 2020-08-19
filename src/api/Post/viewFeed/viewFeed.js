import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    viewFeed: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { pageNumber, items } = args;
      const following = await prisma.user({ id: user.id }).following();
      return prisma.posts({
        first: items,
        skip: pageNumber,
        where: {
          user: {
            id_in: [...following.map((user) => user.id), user.id],
          },
        },
        orderBy: "createdAt_DESC",
      });
    },
  },
};
