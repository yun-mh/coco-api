import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getWalkersLocation: {
      subscribe: (_, __) => {
        const walkers = prisma.$subscribe
          .walker({
            mutation_in: ["CREATED", "UPDATED"],
            node: {
              isWalking: true,
            },
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
