import nodemailer from "nodemailer";

const user = "prateek.jn624@gmail.com";
const pass = "upbofodmdvnunsjo";

const transporter = nodemailer.createTransport({
  // Configure your email service provider
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
export const sendEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: user,
      to: email,
      subject: "Application Confirmation",
      html: ` <h1>Job Application Confirmation</h1>
      <br>
      <p>Dear ${name},</p>
      <br>
      <p>Thank you for applying to a job at Easily. We have received your application and are currently reviewing it.</p>
      <p>If your qualifications match our requirements, we will contact you for the next steps of the selection process</p>
      <p>Thank you for your interest in joining our team!</p>
      <br>
      <br>
      <p>Best regards,</p>
  
      <p>The Easily Team</p>  `,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default transporter;
