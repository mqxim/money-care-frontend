import { UserRepository } from '../../domain/repository/user.repository';
import { UserModelManager } from '../../domain/model-manager/user.model-manager';
import { User } from '../../domain/model/user.model';
import { generateId } from '../../../shared/domain/utils/random';
import { Injectable } from '@angular/core';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';

class UserWithSameEmailAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`UserWithSameEmailAlreadyExistsException: user with email ${email} already exists.`);
  }
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userModelManager: UserModelManager,
    private authService: CredentialsService,
  ) {
  }

  public async exec(request: CreateUserRequest): Promise<CreateUserResponse> {
    const users = await this.userRepository.findByEmail(request.email);

    if (users.length !== 0) {
      throw new UserWithSameEmailAlreadyExistsException(request.email);
    }

    const user = await this.userModelManager.save(new User(
      generateId(),
      request.email,
      request.firstName,
      request.lastName,
      request.password
    ));

    this.authService.authorize({
      id: user.id,
      email: user.getEmail(),
      password: request.password,
    });

    return {
      id: user.id,
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName()
    };
  }
}
