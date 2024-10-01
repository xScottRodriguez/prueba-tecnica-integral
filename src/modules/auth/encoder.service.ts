import * as bcrypt from 'bcrypt';
export class EncoderService {
  #saltRounds = 10;
  encodePassword(password: string): string {
    return bcrypt.hashSync(password, this.#saltRounds);
  }
  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
