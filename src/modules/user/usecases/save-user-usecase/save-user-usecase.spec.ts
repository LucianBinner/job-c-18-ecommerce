import {
  CryptographyInterface,
  ValidatorInterface,
} from '@/modules/@shared/protocols';
import { UserRepository } from '../../domain/repositories/user/user-repository';
import { ConflictException } from '@nestjs/common';
import { UserModel } from '../../domain/models/user-model';
import { SaveUserInput } from './save-user-input';
import { SaveUserUseCase } from './save-user-usecase';

const mockInput = (): SaveUserInput => ({
  name: 'any_name',
  accessId: 'ANY_ACCESS_ID',
  password: 'any_password',
});

const mockUser = (): UserModel => ({
  id: 1,
  accessId: 'ANY_ACCESS_ID',
  name: 'any_name',
  isActive: true,
  note: 'any_note',
  password: 'any_password_hashed',
});

type SutTypes = {
  sut: SaveUserUseCase;
  mockValidationStub: ValidatorInterface;
  mockUserRepositoryStub: UserRepository;
  mockCryptographyStub: CryptographyInterface;
};

const mockValidation = (): ValidatorInterface => {
  class validationStub implements ValidatorInterface {
    validate(): void {
      return;
    }
  }
  return new validationStub();
};

const mockUserRepository = (): UserRepository => {
  class mockUserRepositoryStub implements UserRepository {
    async save(): Promise<UserModel> {
      return mockUser();
    }
    async getByAccessId(): Promise<UserModel | null> {
      return null;
    }
  }
  return new mockUserRepositoryStub();
};

const mockCryptography = (): CryptographyInterface => {
  class mockCryptographyStub implements CryptographyInterface {
    async hash(): Promise<string> {
      return mockUser().password;
    }
  }
  return new mockCryptographyStub();
};

const makeSut = (): SutTypes => {
  const mockValidationStub = mockValidation();
  const mockUserRepositoryStub = mockUserRepository();
  const mockCryptographyStub = mockCryptography();
  const sut = new SaveUserUseCase(
    mockValidationStub,
    mockUserRepositoryStub,
    mockCryptographyStub,
  );
  return {
    sut,
    mockValidationStub,
    mockUserRepositoryStub,
    mockCryptographyStub,
  };
};

describe('SignUp Controllers', () => {
  test('Should return a void if registered successfully', async () => {
    const { sut } = makeSut();
    const useCaseResponse = await sut.handle(mockInput());
    expect(useCaseResponse).toBeUndefined();
  });

  test('Should call Validation with correct values', async () => {
    const { sut, mockValidationStub } = makeSut();
    const input = mockInput();
    const validationSpy = jest.spyOn(mockValidationStub, 'validate');
    await sut.handle(input);
    expect(validationSpy).toHaveBeenCalledWith(input);
  });

  test('Should return Error if validation instanced correct', async () => {
    const { sut, mockValidationStub } = makeSut();
    const input = mockInput();
    jest.spyOn(mockValidationStub, 'validate').mockImplementation(() => {
      throw new Error('Test Error!');
    });
    try {
      await sut.handle(input);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test Error!');
    }
  });

  test('Should call getByAccessId with correct values', async () => {
    const { sut, mockUserRepositoryStub } = makeSut();
    const input = mockInput();
    const getSpy = jest.spyOn(mockUserRepositoryStub, 'getByAccessId');
    await sut.handle(input);
    expect(getSpy).toHaveBeenCalledWith(input.accessId);
  });

  test('Should return ConflictException error if the user is already registered', async () => {
    const { sut, mockUserRepositoryStub } = makeSut();
    const input = mockInput();
    jest
      .spyOn(mockUserRepositoryStub, 'getByAccessId')
      .mockImplementation(async () => {
        return mockUser();
      });
    try {
      await sut.handle(input);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message).toBe(`Conflict Data: ${input.accessId}`);
    }
  });

  test('Should call hash with correct values', async () => {
    const { sut, mockCryptographyStub } = makeSut();
    const input = mockInput();
    const getSpy = jest.spyOn(mockCryptographyStub, 'hash');
    await sut.handle(input);
    expect(getSpy).toHaveBeenCalledWith(input.password);
  });

  test('Should call save with correct values', async () => {
    const { sut, mockUserRepositoryStub } = makeSut();
    const input = mockInput();
    const saveSpy = jest.spyOn(mockUserRepositoryStub, 'save');
    await sut.handle(input);
    expect(saveSpy).toHaveBeenCalledWith({
      ...input,
      password: mockUser().password,
    });
  });
});
