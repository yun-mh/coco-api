import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getWalkersLocation: {
      subscribe: (_, args) => {
        const walkers = prisma.$subscribe
          .walkers({
            AND: [
              { mutation_in: ["CREATED", "UPDATED"] },
              //   {
              //     node: {
              //       chatroom: { id: roomId },
              //     },
              //   },
            ],
          })
          .node();
        console.log(walkers);
        return walkers;
      },
      resolve: (payload) => {
        return payload;
      },
    },
  },
};
