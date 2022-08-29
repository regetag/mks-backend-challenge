import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWT(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async validateJWT(jwt: string) {
    const verified = await this.jwtService.verifyAsync(jwt, {
      secret: process.env.SECRET_JWT,
    });

    console.log(verified);

    return verified;
  }
}
