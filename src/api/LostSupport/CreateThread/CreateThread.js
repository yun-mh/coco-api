import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createThread: async (_, args) => {
      // console.log(args);
        console.log(args);
      const { dogId, name, breed, age, gender, size, weight, feature, images, lostWhen, lostWhere, phone, email } = args;
      const thread = await prisma.createLostDogThread({
        dog: { connect: { id: dogId }},
        name,
        breed,
        age,
        gender,
        size,
        weight,
        feature,
        lostWhen,
        lostWhere,
        phone,
        email,
        isClosed: false
      });
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
      return thread;
    },
  },
};
