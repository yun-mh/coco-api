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
    html: `<style>
    table { width: 100%; border-collapse: collapse; } 
    .logo { color: #d5d9e1; background-color: rgb(118, 198, 188); font-size: 300%; padding: 20px; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; line-height: 2em; }
    </style>
    <table>
    <tbody>
    <tr>
    <td class="logo">
    <img src="https://coco-for-dogs.s3-ap-northeast-1.amazonaws.com/notification.png" alt="logo" style="display:inline-block;height:2em;width:2em;vertical-align:top;">
    <div style="display: inline-block; min-height: 2em; vertical-align: top;"> COCO</div>
    </td>
    </tr>
    </tbody>
    </table>シークレットコードは <b>${secret}</b>です。<br />アプリの入力欄にコードを入力してください。`,
  }; // fix this later
  return sendMail(email);
};

export const sendWebPasswordResetMail = (emailAddress, id, token) => {
  const email = {
    from: "no-reply@coco.com",
    to: emailAddress,
    subject: "[ココ] パスワード再設定の案内 🐩",
    html:
      `下のリンクをクリックしてパスワードの変更を行ってください。\n` +
      `<a href="http://localhost:3000/reset/${id}/${token}">http://localhost:3000/reset/${id}/${token}</a>`,
  }; // fix this later
  return sendMail(email);
};

export const encryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

export const decryptPassword = (enteredPassword, savedPassword) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
