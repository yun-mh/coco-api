import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      // 各種引数の取得
      const { id: targetId, token } = args;
      const { user: currentUser } = request;

      // フォロー処理
      try {
        await prisma.updateUser({
          where: { id: currentUser.id },
          data: {
            following: {
              connect: {
                id: targetId,
              },
            },
          },
        });

        // 通知のデータを追加
        await prisma.createNotification({
          from: {
            connect: {
              id: currentUser.id,
            },
          },
          user: {
            connect: {
              id: targetId,
            },
          },
          type: "FOLLOW",
        });

        // トークンがある場合、プッシュ通知を行う
        if (token !== "" && token !== undefined) {
          await axios.post("https://exp.host/--/api/v2/push/send", {
            to: token,
            title: `フォロー！`,
            body: `${currentUser.username}さんがフォローしました。`,
            data: {
              type: "follow",
              id: currentUser.id,
            },
          });
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
