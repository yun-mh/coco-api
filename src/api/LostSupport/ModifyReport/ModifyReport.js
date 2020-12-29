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
        dogId,
        user,
      } = args;

      // レポートの存在チェック
      const reportExist = await prisma.$exists.lostDogReport({ id: reportId });
      if (reportExist) {
        // レポートの更新
        const result = prisma.updateLostDogReport({
          data: { reportType, location, when, name, phone, memo },
          where: { id: reportId },
        });

        // トークンの引数が存在したらプッシュ通知を行う
        if (token !== "" && token !== undefined) {
          await axios.post("https://exp.host/--/api/v2/push/send", {
            to: token,
            title: "ココ迷子サポート",
            body: "レポートが更新されました。クリックしてすぐ確認しましょう！",
            data: {
              type: "lostDog",
              url: `https://support.cocofordogs.com/${dogId}?owner=${user}`,
            },
          });
        }

        return result;
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};
