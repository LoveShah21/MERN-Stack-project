const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// Submit Contact Form
const submitContactForm = async (req, res) => {
  const { firstName,lastName, email,phone,subject, message } = req.body;
  try {
    const contact = await Contact.create({ firstName,lastName, email,phone,subject, message });

    await sendEmail({
            to: 'info@aquaoverseas.com',
            subject: subject,
            html: `
              <p>Name: ${firstName} ${lastName} <br>
              Email: ${email} <br>
              Phone: ${phone} <br>
              Message: ${message} <br>
              </p>
            `,
          });

    
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitContactForm };