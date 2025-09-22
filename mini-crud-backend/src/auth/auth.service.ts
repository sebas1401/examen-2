import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const norm = (email || '').trim().toLowerCase();
    const exists = await this.usersService.findByEmail(norm);
    if (exists) throw new ConflictException('Email already registered');

    const hash = await bcrypt.hash((password || '').trim(), 10);
    const user = await this.usersService.create(norm, hash);
    return { id: user.id, email: user.email, createdAt: user.createdAt };
  }

  async login(email: string, password: string) {
    const norm = (email || '').trim().toLowerCase();
    const user = await this.usersService.findByEmail(norm);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare((password || '').trim(), user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
