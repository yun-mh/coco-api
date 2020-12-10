import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getWalkersLocation: {
      subscribe: (_, __) => {
        const walker = prisma.$subscribe
          .walker({
            mutation_in: ["CREATED", "UPDATED"],
            node: {
              isWalking: true,
            },
          })
          .node();
        console.log(walker);
        return walker;
      },
      resolve: (payload) => {
        return payload;
      },
    },
  },
};
