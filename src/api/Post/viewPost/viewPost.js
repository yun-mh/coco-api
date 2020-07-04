import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    viewPost: async (_, args) => {
      const { id } = args;
      return prisma.post({ id });
    },
  },
};
