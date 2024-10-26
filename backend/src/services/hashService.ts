import crypto from 'crypto';

export const generateHash = (): string => {
  return crypto.randomBytes(16).toString('hex')
};