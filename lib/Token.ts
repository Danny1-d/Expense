import { getVerficiationTokenByEmail } from '@/data/VerficiationToken';
import { v4 as uuid } from 'uuid';
import { db } from '@/lib/db';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';

import crypto from 'crypto';

import { getTwoFactorTokenByEmail } from '@/data/TwoFactorToken';

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();

  const expires = new Date(new Date().getTime() + 36000 * 1000); // Token expires in one hour

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateVerficiationToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 3600 * 1000 ); //Token expires in one hour

  const exisitngToken = await getVerficiationTokenByEmail(email)

  if (exisitngToken) {
    await db.verficationToken.delete({
      where: {
        id: exisitngToken.id,
      },
    })
  }

  const verficationToken = await db.verficationToken.create({
    data: {
      email,
      token,
      expires,
    }
  })

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 3600 * 1000 ); //Token expires in one hour

  const exisitngToken = await getPasswordResetTokenByEmail(email)

  if (exisitngToken) {
    await db.passwordResetToken.delete({
      where: {
        id: exisitngToken.id,
      },
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return passwordResetToken;
};