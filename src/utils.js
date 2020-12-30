import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import inLineCss from "nodemailer-juice";
import { adjectives, nouns } from "./words";

/**
 * パスワード変更用（モバイル）の認証コードを生成する
 */
export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};

/**
 * メールを送信する
 * @param {String} content メール本文
 */
const sendMail = (content) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  client.use("compile", inLineCss());

  return client.sendMail(content);
};

/**
 * 会員登録完了のお知らせメールを送信する
 * @param {String} emailAddress メールアドレス
 */
export const sendRegistrationDoneMail = (emailAddress) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] 会員登録完了のお知らせ 🐩",
    html: `
    <style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #ffffff; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    .content { background-color: #ffffff; color: #333333; padding: 20px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
    </style>
    <table>
    <tbody>
    <tr>
    <td class="logo">
    <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/notification.png" alt="logo" style="display:inline-block;height:2em;width:2em;vertical-align:top;">
    <div style="display: inline-block; min-height: 2em; vertical-align: top;"> COCO</div>
    </td>
    </tr>
    <tr>
    <td class="content">
    犬のためのSNS「ココ」の会員にご登録いただき誠にありがとうございます。<br />
    会員様のご利用を心よりお待ちしております。<br /><br />
    ココより
    </td>
    </tr>
    </tbody>
    </table>
    `,
  };

  return sendMail(email);
};

/**
 * パスワードリセット（モバイル用）のメールを送信する
 * @param {String} emailAddress メールアドレス
 * @param {String} secret 認証コード
 */
export const sendPasswordResetMail = (emailAddress, secret) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] パスワード再設定の案内 🐩",
    html: `
    <style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #ffffff; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    .content { background-color: #ffffff; color: #333333; padding: 20px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
    </style>
    <table>
    <tbody>
    <tr>
    <td class="logo">
    <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/notification.png" alt="logo" style="display:inline-block;height:2em;width:2em;vertical-align:top;">
    <div style="display: inline-block; min-height: 2em; vertical-align: top;"> COCO</div>
    </td>
    </tr>
    <tr>
    <td class="content">
    「ココ」のパスワード再設定の申請を受け付けました。<br />
    パスワードの再設定をご希望の場合は、以下のコードをアプリの入力欄に記入し新しいパスワードをご登録ください。<br /><br />
    <b>${secret}</b><br /><br />
    ココより
    </td>
    </tr>
    </tbody>
    </table>
    `,
  };

  return sendMail(email);
};

/**
 * パスワードリセット（WEB用）メールを送信する
 * @param {String} emailAddress メールアドレス
 * @param {String} id ユーザID
 * @param {String} token リセット用トークン
 */
export const sendWebPasswordResetMail = (emailAddress, id, token) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] パスワード再設定の案内 🐩",
    html: `
    <style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #ffffff; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    .content { background-color: #ffffff; color: #333333; padding: 20px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
    .btn { background-color: rgb(118, 198, 188); padding: 10px; border-radius: 3px; text-decoration: none; color: #eeeeee; }
    a:hover { opacity: 0.7 }
    </style>
    <table>
    <tbody>
    <tr>
    <td class="logo">
    <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/notification.png" alt="logo" style="display:inline-block;height:2em;width:2em;vertical-align:top;">
    <div style="display: inline-block; min-height: 2em; vertical-align: top;"> COCO</div>
    </td>
    </tr>
    <tr>
    <td class="content">
    「ココ」のパスワード再設定の申請を受け付けました。<br />
    パスワードの再設定をご希望の場合は、以下のボタンをクリックし新しいパスワードをご登録ください。<br /><br />
    <a class="btn" href="https://www.cocofordogs.com/reset/${id}/${token}">パスワード再設定へ</a><br /><br />
    ココより
    </td>
    </tr>
    </tbody>
    </table>
    `,
  };

  return sendMail(email);
};

/**
 * パスワードを暗号化する
 * @param {String} password パスワード
 */
export const encryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

/**
 * パスワードを復号化する
 * @param {String} enteredPassword 入力したパスワード
 * @param {String} savedPassword データベースに保存されているパスワード
 */
export const decryptPassword = (enteredPassword, savedPassword) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

/**
 * 認証済みかどうかを判別するためのトークンを発行する
 * @param {String} id ユーザID
 */
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
