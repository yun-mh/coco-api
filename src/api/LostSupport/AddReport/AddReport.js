import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    addReport: async (_, args) => {
      // 引数の取得
      const {
        threadId,
        password,
        reportType,
        location,
        when,
        name,
        phone,
        memo,
        token,
        dogId,
        user,
      } = args;

      // パスワード暗号化
      const encrypted = await encryptPassword(password);

      // レポート生成
      const result = prisma.createLostDogReport({
        thread: { connect: { id: threadId } },
        password: encrypted,
        reportType,
        location,
        when,
        name,
        phone,
        memo,
        dogId,
        user,
      });

      // トークンの引数が存在したらプッシュ通知を行う
      if (token !== "" && token !== undefined) {
        await axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title: "ココ迷子サポート",
          body: "新しいレポートが登録されました。すぐ確認しましょう！",
          data: {
            url: `https://support.cocofordogs.com/${dogId}?owner=${user}`,
          },
        });
      }

      return result;
    },
  },
};
