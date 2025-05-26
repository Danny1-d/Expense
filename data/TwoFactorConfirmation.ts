import { db } from "@/lib/db";


export const getTwoFactorConfirmationByUserId = (userId: string) => {
  try {
    const twoFactor = db.twoFactorConfirmation.findUnique({
      where: {
        userId
      }
    });

    return twoFactor;
  } catch {
    return null;
  }
};