import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editDog: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, image, name, gender, birthdate, isMissed, action } = args;
      const { user } = request;
      const dog = await prisma.$exists.dog({ id, user: { id: user.id } });
      if (dog) {
        if (action === EDIT) {
          return prisma.updateDog({
            data: { image, name, gender, birthdate, isMissed },
            where: { id },
          });
        } else if (action === DELETE) {
          await prisma.deleteDog({ id });
          return prisma.user({ id: user.id }).dogs();
        }
      } else {
        throw Error("対象犬が存在しません。");
      }
    },
  },
};
