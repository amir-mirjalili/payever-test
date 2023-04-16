import * as bcrypt from 'bcryptjs';

/**
 * Generate hashed password
 * @param rawPassword
 * @param hashingRounds
 * @returns hashed password
 */
export const hashPassword = (
  rawPassword: string,
  hashingRounds = 8,
): string => {
  return bcrypt.hashSync(rawPassword, hashingRounds);
};
