import { prisma } from "../../../generated/prisma-client";

export default {
  ChatRoom: {
    participants: ({ id }) => prisma.chatRoom({ id }).participants(),
    messages: ({ id }) => prisma.chatRoom({ id }).messages(),
  },
};
