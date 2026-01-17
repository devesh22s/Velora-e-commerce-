import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Configure Transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 465,
    service: process.env.EMAIL_SERVICE || "gmail",
    secure: true, // Port 465 ke liye true rakhein (SSL)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Ensure karein ki .env me password bina space ke ho
    },
  });

  // 2. Configure Email Content
  const mailOptions = {
    // Sender Name: "Velora Support" <email@gmail.com>
    from: `"Velora Support" <${process.env.EMAIL_USER}>`, 
    
    to: options.email,
    subject: options.subject,
    
    // Plain text version (Fallback)
    text: options.message,
    
    // HTML Version (Professional Look)
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #2563eb; text-align: center; margin-bottom: 20px;">Velora Support</h2>
        <hr style="border: 0; border-top: 1px solid #f0f0f0; margin: 20px 0;">
        
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          ${options.message.replace(/\n/g, '<br>')}
        </p>
        
        <hr style="border: 0; border-top: 1px solid #f0f0f0; margin: 20px 0;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          This is an automated email. Please do not reply directly to this message.
        </p>
      </div>
    `,
  };

  // 3. Send Email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;