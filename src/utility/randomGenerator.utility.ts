import * as randomNumber from 'random-number-csprng';

/**
 * Generate Random Number or String such as: code , number or random choice in array
 * return {string}
 */

/**
 * Generate random secure code with specified length.
 *
 * @param {number} length - Length of the generated code.
 * @returns {number} secure randomNumber
 */
export const generateRandomCode = async (length: number): Promise<number> => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return await randomNumber(min, max); // n (n = length) digit secure random number
};
