import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    getLocationsByChannel: {
      subscribe: (_, args) => {
        const { channelName } = args;
        return prisma.$subscribe
          .userLocations({
            AND: [
              { mutation_in: ["CREATED", "UPDATED", "DELETED"] },
              {
                node: {
                  channel: { name: channelName },
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
