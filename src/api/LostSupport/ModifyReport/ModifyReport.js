import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyReport: async (_, args) => {
      // 引数の取得
      const {
        reportId,
        reportType,
        location,
        when,
        name,
        phone,
        memo,
        token,
      } = args;

      // レポートの存在チェック
      const reportExist = await prisma.$exists.lostDogReport({ id: reportId });
      if (reportExist) {
        // レポートの更新
        const result = prisma.updateLostDogReport({
          data: { reportType, location, when, name, phone, memo },
          where: { id: reportId },
        });

        console.log(token);
        // トークンの引数が存在したらプッシュ通知を行う
        if (token !== "" && token !== undefined) {
          console.log("fired");
          await axios.post("https://exp.host/--/api/v2/push/send", {
            to: token,
            title: "ココ迷子サポート",
            body: "レポートが更新されました。すぐ確認しましょう！",
          });
        }

        return result;
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};
