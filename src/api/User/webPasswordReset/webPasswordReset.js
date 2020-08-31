import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator, sendPasswordResetMail } from "../../../utils";

export default {
  Mutation: {
    webPasswordReset: async (_, args) => {
      const { email } = args;
      const user = await prisma.$exists.user({ email });
      if (!user) {
        throw Error("登録されていないメールアドレスです。");
      }
      try {
        await prisma.updateUser({
          data: { resetToken: token },
          where: { email },
        });
      } catch (error) {
        console.warn(error);
        return false;
      }
      await sendPasswordResetMail(email, token);
      return true;
    },
  },
};
