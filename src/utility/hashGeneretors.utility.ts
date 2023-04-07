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

/**
 * Decrypt salt password
 * @param raw_password string password
 * @param hashed_password salt hashed password
 * @returns boolean
 */
export const validate_password = async (
  raw_password: string,
  hashed_password: string,
): Promise<boolean> => {
  return await bcrypt.compare(raw_password, hashed_password);
};
