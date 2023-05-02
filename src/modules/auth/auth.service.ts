import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(user: User) {
    // TODO: Add JWT token
    return user;
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
