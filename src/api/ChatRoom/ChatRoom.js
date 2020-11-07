import { prisma } from "../../../generated/prisma-client";

export default {
  ChatRoom: {
    user: ({ id }) => prisma.chatRoom({ id }).user(),
    participants: ({ id }) => prisma.chatRoom({ id }).participants(),
    messages: ({ id }) => prisma.chatRoom({ id }).messages(),
  },
};
