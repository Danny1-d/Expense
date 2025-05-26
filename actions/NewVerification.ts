"use server";

import {db} from "@/lib/db"
import {getUserByEmail} from "@/data/User"
import { getVerficiationTokenByToken } from "@/data/VerficiationToken";
 
const NewVerification = async (token: string) => {
  const exisitngToken = await getVerficiationTokenByToken(token);

  if(!exisitngToken) {
    return { error : "Token does not exist!"}
  };

  const hasExpired = new Date(exisitngToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired"}
  }

  const existingUser = await getUserByEmail(exisitngToken.email);

  if(!existingUser) {
    return {error: "Email does not exist"};
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: exisitngToken.email
    }
  });

  await db.verficationToken.delete ({
    where: { id: exisitngToken.id }
  });

  return { success: "Email verified!"}
}

export default NewVerification; 