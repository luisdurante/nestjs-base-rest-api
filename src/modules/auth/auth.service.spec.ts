import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersMock } from '../../common/test/users-mock';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const usersMock = new UsersMock();

  const usersServiceMock = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
  };

  (bcrypt.compare as jest.Mock) = jest.fn();
  (bcrypt.hash as jest.Mock) = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  beforeEach(async () => {
    usersServiceMock.create.mockReset();
    usersServiceMock.findOneByEmail.mockReset();
    jwtServiceMock.sign.mockReset();
    (bcrypt.compare as jest.Mock).mockReset();
    (bcrypt.hash as jest.Mock).mockReset();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a validated user', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockImplementation(async () => userMock);

      // Act
      const user = await authService.validateUser(
        userMock.email,
        userMock.password,
      );
      const { password, ...validatedUser } = user;

      // Assert
      expect(user).toMatchObject(validatedUser);
      expect(usersService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });

    it(`should return null - invalid user`, async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockImplementation(async () => userMock);

      // Act
      const validatedUser = await authService.validateUser(
        userMock.email,
        userMock.password,
      );

      // Assert
      expect(validatedUser).toBeNull();
      expect(usersService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should return a valid user and their access token', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const jwtMock = usersMock.validAccessToken;
      jest.spyOn(jwtService, 'sign').mockReturnValue(jwtMock);

      // Act
      const login = await authService.login(userMock);

      // Assert
      expect(login).toMatchObject({ access_token: jwtMock, user: userMock });
    });
  });

  describe('signup', () => {
    it('should return a created user', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const createUserInput = {
        email: userMock.email,
        name: userMock.name,
        password: userMock.password,
        birthDate: userMock.birthDate,
      };
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(async () => 'f4k3H4sh3Dp4ssw0rD');
      jest
        .spyOn(usersService, 'create')
        .mockImplementation(async () => userMock);

      // Act
      const user = await authService.signup(createUserInput);

      // Assert
      expect(user).toMatchObject(userMock);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledTimes(1);
    });
  });
});
