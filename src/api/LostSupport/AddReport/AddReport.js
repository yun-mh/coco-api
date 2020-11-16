import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReport: async (_, args) => {
        const { threadId, reportType, location, when, name, phone, memo } = args;
        return prisma.createLostDogReport({
          thread: { connect: { id: threadId }},
          reportType,
          location,
          when,
          name,
          phone,
          memo
        });
    },
  },
};