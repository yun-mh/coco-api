import crypto from "crypto";
import { prisma } from "../../../../generated/prisma-client";
import { sendWebPasswordResetMail } from "../../../utils";

export default {
  Mutation: {
    webPasswordReset: async (_, args) => {
      const { email } = args;
      const exist = await prisma.$exists.user({ email });
      if (!exist) {
        throw Error("登録されていないメールアドレスです。");
      }

      let id;
      try {
        const user = await prisma.user({ email }).id();
        id = user;
      } catch {
        return false;
      }

      const token = crypto.randomBytes(20).toString("hex");
      try {
        await prisma.updateUser({
          data: { resetSecret: token },
          where: { email },
        });
      } catch (error) {
        return false;
      }
      await sendWebPasswordResetMail(email, id, token);
      return true;
    },
  },
};
