import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupDto: CreateUserDto): Promise<User> {
    signupDto.password = await bcrypt.hash(signupDto.password, 10);
    return this.usersService.create(signupDto);
  }
}
