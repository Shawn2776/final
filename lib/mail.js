import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `http://smrtevote.com/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "donotreply@smrtevote.com",
    to: email,
    subject: "Verify your email address",
    html: `<p>Thank You for joining SMRTeVote! To activate your account and start creating elections, please click the verification link below:</p>
    
    <p><a href="${confirmLink}">Verify your email address.</a></p>
    
    <p>Thank You!</p>
    
    <p>The Team @ <a href="https://www.smrtevote.com">SMRTeVote</a></p>
    `,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://smrtevote.com/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "donotreply@smrtevote.com",
    to: email,
    subject: "Reset your Password",
    html: `<p>Forgot your password? Click the link below to reset it:</p>

    <p style="font-weight: bold; font-size: 14px; color: red;"><a href="${resetLink}">Reset your password.</a></p>

    <p>Thank You!</p>

    <p>The Team @ <a href="https://www.smrtevote.com">SMRTeVote</a></p>
    `,
  });
};

export const sendTwoFactorTokenEmail = async (email, token) => {
  await resend.emails.send({
    from: "donotreply@smrtevote.com",
    to: email,
    subject: "Two Factor Authentication Code",
    html: `<p>Your two factor authentication code is:<br> <p style="font-size: 20px; color: red;"><strong>${token}</strong></p></p><p>Thank You!</p>

    <p>The Team @ <a href="https://www.smrtevote.com">SMRTeVote</a></p>`,
  });
};