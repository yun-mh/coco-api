import { prisma } from "../../../generated/prisma-client";

export default {
  Walker: {
    user: ({ id }) => prisma.walker({ id }).user(),
  },
};
