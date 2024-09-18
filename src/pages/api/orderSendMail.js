import { emailPassword, emailUsername, siteFromEmail, siteEmail } from '@/utils/variables';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, email, phone, address, city, instructions, giftItem, receiverName, receiverPhone, receiverAddress, receiverCity, itemListMail, totalAMount } = req.body;

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
      subject: 'New Order Received | Chuchoter',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Received</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; margin: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #c89a3f;">New Order Received</h2>
        
        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Order Details:</h3>
            <p style="margin: 0;"><strong>Order Date:</strong> [`+ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + `]</p>
         </div>

        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Customer Information:</h3>
            <p style="margin: 0;"><strong>Full Name:</strong> [`+ fullname + `]</p>
            <p style="margin: 0;"><strong>Email:</strong> [`+ email + `]</p>
            <p style="margin: 0;"><strong>Phone:</strong> [`+ phone + `]</p>
            <p style="margin: 0;"><strong>Address:</strong> [`+ address + `], [` + city + `]</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Delivery Information:</h3>
            <p style="margin: 0;"><strong>Receiver Name:</strong> [`+ receiverName + `]</p>
            <p style="margin: 0;"><strong>Receiver Phone:</strong> [`+ receiverPhone + `]</p>
            <p style="margin: 0;"><strong>Receiver Address:</strong> [`+ receiverAddress + `], [` + receiverCity + `]</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Gift Item (if applicable):</h3>
            <p style="margin: 0;">[`+ giftItem + `]</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Order Items:</h3>
            `+ itemListMail + `
        </div>

          <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Total Amount:</h3>
            <p style="margin: 0;background:yellow;">[`+ totalAMount + `QR]</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 10px; font-size: 18px;">Special Instructions:</h3>
            <p style="margin: 0;">[`+ instructions + `]</p>
        </div>

        <div style="margin-top: 20px; font-size: 14px; color: #777;">
            <p style="margin: 0;">Please ensure this order is processed in a timely manner and all relevant departments are notified. If there are any discrepancies or additional information needed, do not hesitate to reach out.</p>
     </div>
    </div>
</body>
</html>


 `,
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