import { prisma } from "../../../generated/prisma-client";

export default {
  LostDogThread: {
    dog: ({ id }) => prisma.lostDogThread({ id }).dog(),
    images: ({ id }) => prisma.lostDogThread({ id }).images(),
    reports: ({ id }) => prisma.lostDogThread({ id }).reports(),
  },
};
