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

        let defaultImages = [];
        const defaultImageData = await prisma.lostDogImages({ where: {
          thread: {
            id: thread.id,
          },
        }}).id();
        defaultImageData.map(data => defaultImages.push(data.id));

        // 既存データにないイメージはアップロードする
        images.forEach(
          async (image) => {
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
                id: defaultImage
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