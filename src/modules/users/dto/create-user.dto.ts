export class CreateUserDto {
  readonly email: string;
  readonly name: string;
  password: string;
  readonly birthDate: Date;
}
