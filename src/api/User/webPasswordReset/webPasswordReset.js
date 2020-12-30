import crypto from "crypto";
import { prisma } from "../../../../generated/prisma-client";
import { sendWebPasswordResetMail } from "../../../utils";

export default {
  Mutation: {
    /**
     * パスワードリセット（WEB用）の申し込みに対応する
     */
    webPasswordReset: async (_, args) => {
      // 各種引数の取得
      const { email } = args;

      // const exist = await prisma.$exists.user({ email });
      // if (!exist) {
      //   throw Error("登録されていないメールアドレスです。");
      // }

      // let id;
      // try {
      //   const user = await prisma.user({ email }).id();
      //   id = user;
      // } catch {
      //   return false;
      // }

      // パスワードリセットページにアクセスするためのトークンを生成する
      const token = crypto.randomBytes(20).toString("hex");

      // ユーザ情報をアップデートする
      let id;
      try {
        id = await prisma.updateUser({
          data: { resetSecret: token },
          where: { email },
        });
        console.log(id);
      } catch (error) {
        console.warn(error);
        return false;
      }

      // パスワードリセットのためのメールを送信する
      await sendWebPasswordResetMail(email, id, token);

      return true;
    },
  },
};
