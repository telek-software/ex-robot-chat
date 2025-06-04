import * as bcrypt from 'bcryptjs';

export function encrypt(text: string) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
}

export function compare(a: { encrypted: string; decrypted: string }) {
  return bcrypt.compareSync(a.decrypted, a.encrypted);
}
