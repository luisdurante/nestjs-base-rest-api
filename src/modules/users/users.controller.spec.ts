import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ForbiddenException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersMock } from '../../common/test/users-mock';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const usersMock = new UsersMock();

  const usersServiceMock = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersController,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    for (const key in usersServiceMock) {
      usersServiceMock[key].mockReset();
    }
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => usersMock.getValidUsers());

      // Act
      const users = await usersController.findAll();

      // Assert
      expect(users).toHaveLength(usersMock.getUsersLength());
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a valid user', async () => {
      // Arrange
      const mockUser = usersMock.getValidUser();
      jest
        .spyOn(usersService, 'findOneById')
        .mockImplementation(async () => mockUser);

      // Act
      const user = await usersController.findOne(mockUser.id);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(usersService.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should return an updated user', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const updateUserInput = { id: userMock.id, name: 'Updated User' };
      const updatedUserMock = { ...userMock, name: 'Updated User' };
      const context = usersMock.getValidContext();
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(async () => updatedUserMock);

      // Act
      const user = await usersController.update(
        userMock.id,
        updateUserInput,
        context,
      );

      // Assert
      expect(user).toMatchObject(updatedUserMock);
      expect(usersService.update).toHaveBeenCalledTimes(1);
    });

    it(`should return ForbiddenException when user tokens don't match`, async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const updateUserInput = { id: userMock.id, name: 'Updated User' };
      const context = usersMock.getInvalidContext();

      // Act, Assert
      await expect(
        async () =>
          await usersController.update(userMock.id, updateUserInput, context),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateUser', () => {
    it('should return an removed user', async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const context = usersMock.getValidContext();
      jest
        .spyOn(usersService, 'remove')
        .mockImplementation(async () => userMock);

      // Act
      const user = await usersController.remove(userMock.id, context);

      // Assert
      expect(user).toMatchObject(userMock);
      expect(usersService.remove).toHaveBeenCalledTimes(1);
    });

    it(`should return ForbiddenException when user tokens don't match`, async () => {
      // Arrange
      const userMock = usersMock.getValidUser();
      const context = usersMock.getInvalidContext();

      // Act, Assert
      await expect(
        async () => await usersController.remove(userMock.id, context),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.remove).toHaveBeenCalledTimes(0);
    });
  });
});
