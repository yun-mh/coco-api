import { prisma } from "../../../generated/prisma-client";

export default {
  Dog: {
    user: ({ id }) => prisma.dog({ id }).user(),
    lostDogThreads: ({ id }) => prisma.dog({ id }).lostDogThreads(),
  },
};
