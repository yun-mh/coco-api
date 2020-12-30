import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword, sendRegistrationDoneMail } from "../../../utils";

export default {
  Mutation: {
    /**
     * ユーザアカウントを作成する
     */
    createAccount: async (_, args) => {
      // 各種引数の取得
      const { avatar, username, email, password } = args;

      // メールアドレスがすでに登録されているかチェック
      const mailExist = await prisma.$exists.user({ email });
      if (mailExist) {
        throw Error("すでに登録されているメールアドレスです。");
      }

      // ユーザ名が既に登録されているかチェック
      const usernameExist = await prisma.$exists.user({ username });
      if (usernameExist) {
        throw Error("すでに登録されているユーザ名です。");
      }

      // パスワードの暗号化
      const encrypted = await encryptPassword(password);

      // ユーザデータを作成
      await prisma.createUser({
        avatar,
        username,
        email,
        password: encrypted,
      });

      // 会員登録完了のお知らせメールを送信する
      await sendRegistrationDoneMail(email);

      return true;
    },
  },
};
