import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator, sendPasswordResetMail } from "../../../utils";

export default {
  Mutation: {
    passwordReset: async (_, args) => {
      // 各種引数の取得
      const { email } = args;

      // リセットコードを生成する
      const resetSecret = secretGenerator();

      // ユーザ情報をアップデートする
      try {
        await prisma.updateUser({ data: { resetSecret }, where: { email } });
      } catch (error) {
        console.warn(error);
        return false;
      }

      // パスワードリセットのためのメールを送信する
      await sendPasswordResetMail(email, resetSecret);

      return true;
    },
  },
};
