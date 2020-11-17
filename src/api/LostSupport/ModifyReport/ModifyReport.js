import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyReport: async (_, args) => {
      const { reportId, reportType, location, when, name, phone, memo, token } = args;
      const reportExist = await prisma.$exists.lostDogReport({ id: reportId });
      if (reportExist) {
        // sending push notification to owner
        // if (token !== "") {
        //   await axios.post("https://exp.host/--/api/v2/push/send", {
        //     to: token,
        //     title: "迷子状況のレポートが更新されました！",
        //     body: message,
        //   })
        // }
        return prisma.updateLostDogReport({
          data: { reportType, location, when, name, phone, memo },
          where: { id: reportId },
        });
      } else {
        throw Error("対象迷子情報が存在しません。");
      }
    },
  },
};