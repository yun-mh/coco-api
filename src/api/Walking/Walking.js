import { prisma } from "../../../generated/prisma-client";

export default {
  Walker: {
    locations: ({ id }) => prisma.walker({ id }).locations(),
  },
  Location: {
    walker: ({ id }) => prisma.location({ id }).walker(),
  },
};
