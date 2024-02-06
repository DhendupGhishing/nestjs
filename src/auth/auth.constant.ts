import { randomBytes } from 'crypto';
export const jwtConstants = {
    secret: randomBytes(62).toString('hex')

};