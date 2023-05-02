import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersMock } from '../../common/test/users-mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const usersMock = new UsersMock();

  const authServiceMock = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid user with their access token', async () => {
      // Arrange
      const loginMock = {
        access_token: usersMock.validAccessToken,
        user: usersMock.getValidUser(),
      };

      jest.spyOn(authService, 'login').mockReturnValue(loginMock);

      // Act
      const login = authController.login(loginMock.user);

      // Assert
      expect(login).toMatchObject(loginMock);
      expect(authService.login).toBeCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should return a created user', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const createUserInput = {
        email: userMock.email,
        name: userMock.name,
        birthDate: userMock.birthDate,
        password: userMock.email,
      };

      authServiceMock.signup.mockReturnValue(userMock);

      // Act
      const user = authController.signup(createUserInput);

      // Assert
      expect(user).toMatchObject(userMock);
      expect(authService.signup).toBeCalledTimes(1);
    });
  });
});
