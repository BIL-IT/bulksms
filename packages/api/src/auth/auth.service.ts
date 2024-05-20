import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async SignUp(
    email: string,
    username: string,
    password: string,
  ): Promise<string> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          id: crypto.randomUUID(),
          hash: await argon.hash(password),
          username,
        },
      });
      if (!user) throw new Error('Failed to Create an Account');

      const token = this.assignToken(
        user.id,
        user.email,
        user.username,
        user.role,
      );

      return token;
    } catch (error) {
      let user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        user = await this.prisma.user.findFirst({
          where: {
            username,
          },
        });
      }

      if (user) throw new Error('User already exists');

      throw new Error('Something went wrong :/');
    }
  }

  async Login(emailOrUsername: string, password: string): Promise<string> {
    let user = await this.prisma.user.findUnique({
      where: {
        email: emailOrUsername!,
      },
    });

    if (!user) {
      user = await this.prisma.user.findUnique({
        where: {
          username: emailOrUsername,
        },
      });
    }
    if (!user) throw new Error('User not found');

    const isVerified = await argon.verify(user.hash, password);

    if (!isVerified) throw new Error('Incorrect Password');

    const token = this.assignToken(
      user.id,
      user.email,
      user.username,
      user.role,
    );

    return token;
  }

  async assignToken(
    id: string,
    email: string,
    username: string,
    role: 'ADMIN' | 'USER',
  ): Promise<string> {
    const payload = {
      sub: id,
      email,
      username,
      role,
      lastLoggedIn: new Date(),
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
