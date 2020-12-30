import { prisma } from "../../../../generated/prisma-client";
import { decryptPassword, generateToken } from "../../../utils";

export default {
  Mutation: {
    /**
     * ユーザ認証を行う
     */
    login: async (_, args) => {
      // 各種引数の取得
      const { email, password } = args;

      // メールアドレスが登録されているかチェック
      const exist = await prisma.$exists.user({ email });
      if (!exist) {
        throw Error("登録されていないメールアドレスです。");
      }

      // データベースからidとパスワードを取得し照らし合わせる
      const { id, password: savedPassword } = await prisma.user({ email });
      if (await decryptPassword(password, savedPassword)) {
        return generateToken(id);
      } else {
        throw Error("正しいパスワードを入力してください。");
      }
    },
  },
};
