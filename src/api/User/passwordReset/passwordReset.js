import { prisma } from "../../../../generated/prisma-client";
import { secretGenerator, sendPasswordResetMail } from "../../../utils";

export default {
  Mutation: {
    passwordReset: async (_, args) => {
      const { email } = args;
      try {
        const user = await prisma.$exists.user({ email });
        console.log(user);
      } catch (e) {
        // throw Error("登録されていないメールアドレスです。");
      }
      const resetSecret = secretGenerator();
      try {
        await prisma.updateUser({ data: { resetSecret }, where: { email } });
      } catch (error) {
        console.warn(error);
        return false;
      }
      await sendPasswordResetMail(email, resetSecret);
      return true;
    },
  },
};
