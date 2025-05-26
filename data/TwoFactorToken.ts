import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = (token: string) => {
  try {
    const twoFactor = db.twoFactorToken.findUnique({
      where: {
        token
      }
    })

    return twoFactor
  } catch {
    return null;
  }
}

export const getTwoFactorTokenByEmail = (email: string) => {
  try {
    const twoFactor = db.twoFactorToken.findFirst({
      where: {
        email
      }
    })

    return twoFactor
  } catch {
    return null;
  }
}