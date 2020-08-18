import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getNotification: {
      subscribe: (_, args) => {
        const { id } = args;
        return prisma.$subscribe
          .notification({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  user: { id },
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
