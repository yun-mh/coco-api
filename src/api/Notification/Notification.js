import { prisma } from "../../../generated/prisma-client";

export default {
  Notification: {
    from: ({ id }) => prisma.notification({ id }).from(),
    user: ({ id }) => prisma.notification({ id }).user(),
    comment: ({ id }) => prisma.notification({ id }).comment(),
    post: ({ id }) => prisma.notification({ id }).post(),
  },
};
