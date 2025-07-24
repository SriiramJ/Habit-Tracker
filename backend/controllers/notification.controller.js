import admin from "../config/firebaseConfig.js";
import transporter from "../config/mailer.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  validatePushNotification,
  validateEmailNotification,
} from "../utils/validators.js";

// send push notification
export const sendPushNotification = asyncHandler(async (req, res) => {
  const validation = validatePushNotification(req.body);
  if (!validation.success) {
    return res.status(400).json(validation);
  }

  const { token, title, body } = req.body;
  const message = {
    notification: { title, body },
    token,
    webpush: {
      headers: { Urgency: "high" },
      notification: {
        icon: "https://yourdomain.com/icon.png",
        click_action: "https://yourdomain.com",
      },
      fcmOptions: { link: "https://yourdomain.com" },
    },
  };
  await admin.messaging().send(message);
  res.status(200).json({
    message: "Push notification sent",
  });
});

// send Email notification
export const sendEmailNotification = asyncHandler(async (req, res) => {
  const validation = validateEmailNotification(req.body);
  if (!validation || !validation.success) {
    return res.status(400).json(validation);
  }

  const { to, subject, text, html } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };
  await transporter.sendMail(mailOptions);
  res.status(200).json({
    message: "Email sent",
  });
});
