import { prisma } from "../../../generated/prisma-client";

export default {
  Notification: {
    from: ({ id }) => prisma.notification({ id }).from(),
    user: ({ id }) => prisma.notification({ id }).user(),
    post: ({ id }) => prisma.notification({ id }).post(),
  },
};
