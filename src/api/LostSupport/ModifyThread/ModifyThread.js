import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyThread: async (_, args) => {
      const { id, name, breed, age, gender, size, weight, feature, images, lostWhen, lostWhere, owner, phone, email } = args;
      const threadExist = await prisma.$exists.lostDogThread({ id });
      if (threadExist) {
        const thread = await prisma.updateLostDogThread({
          data: { name, breed, age, gender, size, weight, feature, lostWhen, lostWhere, owner, phone, email },
          where: { id },
        });
        console.log(thread);
        const defaultImages = await prisma.lostDogImages({ where: {
          thread: {
            id: thread.id,
          },
        }});
        console.log(defaultImages);

        // 既存データにないイメージはアップロードする
        images.forEach(
          async (image) => {
            console.log(image);
            if (!defaultImages.includes(image)) {
              await prisma.createLostDogImage({
                url: image,
                thread: {
                  connect: {
                    id: thread.id,
                  },
                },
              })
            }
          }
        );

        // 新しくアップデートしようとするイメージで既存データにあるイメージがない場合、削除する
        defaultImages.forEach(
          async (defaultImage) => {
            if (!images.includes(defaultImage)) {
              await prisma.deleteLostDogImage({
                where: {
                  id: defaultImage.id
                }
              })
            }
          }
        );

        return prisma.lostDogThread({ id });
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};