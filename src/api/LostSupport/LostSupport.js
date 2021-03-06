import { prisma } from "../../../generated/prisma-client";

export default {
  LostDogThread: {
    dog: ({ id }) => prisma.lostDogThread({ id }).dog(),
    images: ({ id }) => prisma.lostDogThread({ id }).images(),
    reports: ({ id }) => prisma.lostDogThread({ id }).reports(),
  },
  LostDogReport: {
    thread: ({ id }) => prisma.lostDogReport({ id }).thread(),
  },
  LostDogImage: {
    thread: ({ id }) => prisma.LostDogImage({ id }).thread(),
  }
};
