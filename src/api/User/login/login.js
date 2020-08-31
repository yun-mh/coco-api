import { prisma } from "../../../../generated/prisma-client";
import { decryptPassword, generateToken } from "../../../utils";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      if ((await prisma.$exists.user({ email })) === undefined) {
        throw Error("登録されていないメールアドレスです。");
      }
      const { id, password: savedPassword } = await prisma.user({ email });
      if (await decryptPassword(password, savedPassword)) {
        return generateToken(id);
      } else {
        throw Error("正しいパスワードを入力してください。");
      }
    },
  },
};
