import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import inLineCss from "nodemailer-juice";
import { adjectives, nouns } from "./words";

export const secretGenerator = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]}${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
    },
  };
  const client = nodemailer.createTransport(sgTransport(options));
  client.use("compile", inLineCss());
  return client.sendMail(email);
};

export const sendPasswordResetMail = (emailAddress, secret) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] パスワード再設定の案内 🐩",
    html: `
    <style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #eeeeee; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    .content { background-color: #eeeeee; color: #333333; padding: 20px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
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

export const sendWebPasswordResetMail = (emailAddress, id, token) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] パスワード再設定の案内 🐩",
    html: `
    <style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #eeeeee; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    .content { background-color: #eeeeee; color: #333333; padding: 20px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; }
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

export const encryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

export const decryptPassword = (enteredPassword, savedPassword) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
