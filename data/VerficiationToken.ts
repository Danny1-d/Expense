import { db } from "@/lib/db"

export const getVerficiationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verficationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    console.error("Error fetching verification token:", error);
    throw new Error("Failed to fetch verification token");
  }
}

export const getVerficiationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verficationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    // console.error("Error fetching verification token:", error);
    // throw new Error("Failed to fetch verification token");
    return null
  }
}