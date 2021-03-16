import bcrypt from 'bcrypt';
/**
 * Hash a plaintext password
 * @param plain_password 
 */
export default async function hash(plain_password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plain_password, saltRounds);
    return hash;
}