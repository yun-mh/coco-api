import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyThread: async (_, args) => {
      const { id, name, breed, age, gender, size, weight, feature, images, lostWhen, lostWhere, owner, phone, email } = args;
      const threadExist = await prisma.$exists.lostDogThread({ id });
      if (threadExist) {
        const thread = await prisma.updateLostDogThread({
          data: { name, breed, age, gender, size, weight, feature, images: [], lostWhen, lostWhere, owner, phone, email },
          where: { id },
        });
        console.log(thread);
        images.forEach(
          async (image) =>
            await prisma.createLostDogImage({
              url: image,
              thread: {
                connect: {
                  id: thread.id,
                },
              },
            })
        );
        return prisma.lostDogThread({ id });
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};