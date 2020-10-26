import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { avatar, username, email, password } = args;
      const mailExist = await prisma.$exists.user({ email });
      if (mailExist) {
        throw Error("すでに登録されているメールアドレスです。");
      }
      const usernameExist = await prisma.$exists.user({ username });
      if (usernameExist) {
        throw Error("すでに登録されているユーザ名です。");
      }
      const encrypted = await encryptPassword(password);
      await prisma.createUser({
        avatar,
        username,
        email,
        password: encrypted,
      });
      return true;
    },
  },
};
