import { prisma } from "../../../generated/prisma-client";

export default {
  Walker: {
    id: ({ userId }) => prisma.walker({ user: userId }).id(),
    user: ({ id }) => prisma.walker({ id }).user(),
    locations: ({ id }) => prisma.walker({ id }).locations(),
  },
  Location: {
    walker: ({ id }) => prisma.location({ id }).walker(),
  },
};
