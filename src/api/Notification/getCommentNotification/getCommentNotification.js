import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getCommentNotification: {
      subscribe: (_, args) => {
        const { id } = args;
        return prisma.$subscribe
          .comment({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  post: { user: { id } },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload) => {
        return payload;
      },
    },
  },
};
