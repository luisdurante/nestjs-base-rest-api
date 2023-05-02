import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { User } from '../../modules/users/entities/user.entity';

export class UsersMock {
  private readonly users: User[] = [
    {
      id: '113fad8a-23bc-4e6f-92c2-1705acaec5b9',
      name: 'Fulano da Silva',
      email: 'fulano@email.com',
      password: 'password',
      birthDate: new Date(2000, 3, 14, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '585b7c36-d635-4712-8476-28110b23e7c7',
      name: 'Ciclano da Silva',
      email: 'ciclano@email.com',
      password: 'password',
      birthDate: new Date(1962, 11, 6, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '095b1db2-786c-4a8b-ab69-24f14705bf9c',
      name: 'Beltrano da Silva',
      email: 'beltrano@email.com',
      password: 'password',
      birthDate: new Date(2003, 8, 9, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  readonly invalidEmail: string = 'fake@email.com';

  readonly invalidId: string = '0939e8b6-5542-43b5-9087-76d640c3c4f9';

  readonly validAccessToken: string = 'valid.access_token.jwt';

  getValidUsers(): User[] {
    return this.users;
  }

  getValidUser(): User {
    return this.users[0];
  }

  getCreateUserInput(): CreateUserDto {
    return {
      email: this.users[0].email,
      name: this.users[0].name,
      password: this.users[0].password,
      birthDate: this.users[0].birthDate,
    };
  }

  getCreatedUser(): User {
    return this.users[0];
  }

  getUsersLength(): number {
    return this.users.length;
  }
}
