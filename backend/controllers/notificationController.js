const Notification = require("../models/Notification");
const User = require("../models/User");
// const nodemailer = require("nodemailer");
const sendEmail = require('../utils/sendEmail');
const twilio = require("twilio");

const sendMail = async (email, message) => {
  await sendEmail({
        to: email,
        subject:'Notification',
        html: `
          <p>${message}</p>
        `,
      });
};

const sendSMS = async (phoneNumber, message) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

const sendNotification = async (req, res) => {
  const { message, type } = req.body;

  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send notifications to all users
    for (const user of users) {
      if (type === "email") {
        await sendMail(user.email, message);
      } else if (type === "sms") {
        await sendSMS(user.phone, message);
      }
    }

    // Save notification to the database
    const recipients = users.map((user) =>
      type === "email" ? user.email : user.phone
    );
    const notification = new Notification({ message, recipients, type });
    await notification.save();

    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (res) => {
  try {
    const notifications = await Notification.find().sort({ sentAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {sendNotification, getNotifications};