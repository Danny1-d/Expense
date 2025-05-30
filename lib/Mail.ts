import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorEmail = async (
  email: string,
  token: string
) => {

  await resend.emails.send({
    from: process.env.SENDER_EMAIL!,
    to: email,
    subject: 'Your Two-Factor Authentication Code',
    html: `<p>Your 2FA code ${token} </p>`
  });
}

export const sendVerificiationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: process.env.SENDER_EMAIL!,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
  });
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const ResetPassword = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: process.env.SENDER_EMAIL!,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${ResetPassword}">here</a> to reset your password.</p>`
  });
}