import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  chatroom: { id: roomId },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload) => payload,
    },
  },
};
