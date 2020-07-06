import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    setDog: async (_, args) => {
      const { image, name, breed, gender, birthdate, email } = args;
      const user = await prisma.user({ email });
      await prisma.createDog({
        image,
        name,
        breed,
        gender,
        birthdate,
        user: { connect: { id: user.id } },
      });
      return true;
    },
  },
};
