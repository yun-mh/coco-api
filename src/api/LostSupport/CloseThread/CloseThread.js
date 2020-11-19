import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    closeThread: async (_, args) => {
      const { threadId, dogId } = args;
      const threadExist = await prisma.$exists.thread({ id: threadId });
      if (threadExist) {
        await prisma.updateLostDogThread({
          data: { isClosed: true },
          where: { id: threadId },
        });
        await prisma.updateDog({
          data: { isMissed: false },
          where: { id: dogId }
        });
        return prisma.lostDogThread({ id: threadId });
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};