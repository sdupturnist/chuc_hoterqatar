import { emailPassword, emailUsername, siteFromEmail, siteEmail } from '@/utils/variables';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, name, rating, comment, todayDate } = req.body;

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
      subject: 'New review pending approval | Chuchoter',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Review Pending Approval</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <div style="width: 80%; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;">
        <h1 style="color: #333333;">New Review Pending Your Approval</h1>
        <p style="color: #666666; line-height: 1.6;">Hello Admin</p>
        <p style="color: #666666; line-height: 1.6;">A new review has been submitted and is awaiting your approval. Product id is: [`+productId+`]</p>

        <div style="background-color: #f9f9f9; border-left: 4px solid #c89a3f; padding: 10px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong>Reviewer Name:</strong> [`+name+`]</p>
            <p style="margin: 0;"><strong>Submission Date:</strong> [`+todayDate+`]</p>
           <p style="margin: 0;"><strong>Rating:</strong> [`+rating+`]</p>
            <p style="margin: 0;"><strong>Review Summary:</strong> [`+comment+`]</p>
        </div>

        <p style="color: #666666; line-height: 1.6;">Please log in to your admin panel to review and approve the submission at your earliest convenience.</p>
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