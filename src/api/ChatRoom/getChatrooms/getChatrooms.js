import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getChatrooms: {
      subscribe: (_, args) => {
        const { id } = args;
        return prisma.$subscribe
          .chatRoom({
            AND: [
              { mutation_in: "UPDATED" },
              {
                node: {
                  participants_some: { id },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload) => {
        console.log(payload);
        return payload;
      },
    },
  },
};
