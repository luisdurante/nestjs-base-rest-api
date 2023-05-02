import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: CreateUserDto): Promise<User> {
    signupDto.password = await bcrypt.hash(signupDto.password, 10);
    return this.usersService.create(signupDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return null;

    delete user['password'];

    return user;
  }
}
