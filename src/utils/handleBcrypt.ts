import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

async function generateHash(passwordPlain: string): Promise<string> {
  const hash = await bcrypt.hash(passwordPlain, saltOrRounds);
  return hash;
}

async function compareHash(plain: string, hash: string): Promise<boolean> {
  const result = await bcrypt.compare(plain, hash);
  return result;
}

export { generateHash, compareHash };
