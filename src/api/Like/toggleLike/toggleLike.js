import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      // 認証済みの確認
      isAuthenticated(request);

      // 各種引数の取得
      const { postId, token } = args;
      const { user } = request;
      const toId = await prisma
        .post({ id: postId })
        .user()
        .id();

      // いいね対象のポストの絞り込み
      const findTargetOption = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id: postId,
            },
          },
        ],
      };

      // いいねトグルの処理
      try {
        const likeIsPressed = await prisma.$exists.like(findTargetOption);
        if (likeIsPressed) {
          // 既にいいねされていた場合、いいねを削除する
          await prisma.deleteManyLikes(findTargetOption);
        } else {
          // いいねがない場合、いいねをつける
          await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });

          // 通知のデータを追加
          await prisma.createNotification({
            from: {
              connect: {
                id: user.id,
              },
            },
            user: {
              connect: {
                id: toId,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
            type: "LIKE",
          });
        }

        // トークンがある場合、プッシュ通知を行う
        if (token !== "" && token !== undefined) {
          // await axios.post("https://exp.host/--/api/v2/push/send", {
          //   to: token,
          //   title: `いいね！`,
          //   body: `${user.username}さんが「いいね」を押しました。`,
          //   data: {
          //     type: "like",
          //     id: postId,
          //   },
          // });

          await fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${process.env.FCM_KEY}`,
            },
            body: JSON.stringify({
              to: token,
              priority: "normal",
              data: {
                experienceId: "@yun-mh/coco",
                title: `いいね！`,
                message: `${user.username}さんが「いいね」を押しました。`,
              },
            }),
          });
        }

        return true;
      } catch {
        return false;
      }
    },
  },
};
