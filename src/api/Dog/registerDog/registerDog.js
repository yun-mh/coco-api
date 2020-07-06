import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    registerDog: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { image, name, breed, gender, birthdate } = args;
      return prisma.createDog({
        image,
        name,
        breed,
        gender,
        birthdate,
        user: { connect: { id: user.id } },
      });
    },
  },
};
