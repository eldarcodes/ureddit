import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "zpzkfpxa6qlvpick@ethereal.email",
      pass: "Qv3DHY5SCTjVAwfTsX",
    },
  });

  let info = await transporter.sendMail({
    from: '"Eldar Mirzabekov" <prog.eldar@gmail.com>',
    to,
    subject: "Change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
