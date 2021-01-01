import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    /**
     * パスワードの変更を行う
     */
    passwordChange: async (_, args) => {
      const { email, password } = args;

      // 受け取ったパスワードを暗号化する
      const encrypted = await encryptPassword(password);

      // ユーザ情報をアップデートする
      try {
        await prisma.updateUser({
          data: { password: encrypted, resetSecret: "" },
          where: { email },
        });
      } catch (error) {
        console.warn(error);
        return false;
      }

      return true;
    },
  },
};
