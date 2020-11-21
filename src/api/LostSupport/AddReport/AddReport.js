import { prisma } from "../../../../generated/prisma-client";
import { encryptPassword } from "../../../utils";

export default {
  Mutation: {
    addReport: async (_, args) => {
        const { threadId, password, reportType, location, when, name, phone, memo, token } = args;
        // sending push notification to owner
        // if (token !== "") {
        //   await axios.post("https://exp.host/--/api/v2/push/send", {
        //     to: token,
        //     title: "迷子状況に新しいレポートが登録されました！",
        //     body: message,
        //   })
        // }

        const encrypted = await encryptPassword(password);

        return prisma.createLostDogReport({
          thread: { connect: { id: threadId }},
          password: encrypted,
          reportType,
          location,
          when,
          name,
          phone,
          memo
        });
    },
  },
};
