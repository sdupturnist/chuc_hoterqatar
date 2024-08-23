import { emailPassword, emailUsername, siteFromEmail, siteEmail } from '@/utils/variables';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP server
      port: 587, // Replace with your SMTP port
      auth: {
        user: emailUsername, // Replace with your email address
        pass: emailPassword, // Replace with your email password
      },
    });

    const mailOptions = {
      from: siteFromEmail,
      to: siteEmail,
      subject: 'New Contact Enquiry Received | Chuchoter',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Enquiry Notification</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333333;">New Contact Enquiry Received</h2>
        <p style="color: #555555;">Hi Admin,</p>
        <p style="color: #555555;">We have received a new contact enquiry through our website. Below are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Name:</td>
                <td style="padding: 8px; color: #333333;">[`+name+`]</td>
            </tr>
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Email:</td>
                <td style="padding: 8px; color: #333333;">[`+email+`]</td>
            </tr>
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Phone Number:</td>
                <td style="padding: 8px; color: #333333;">[`+phone+`]</td>
            </tr>
            <tr>
                <td style="padding: 8px; background-color: #f1f1f1; font-weight: bold;">Message:</td>
                <td style="padding: 8px; color: #333333;">[`+message+`]</td>
            </tr>
        </table>

        <p style="color: #555555;">Please review the enquiry and respond accordingly.</p>
        </div>
</body>
</html>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}