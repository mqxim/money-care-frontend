import { UserRepository } from '../../domain/repository/user.repository';
import { UserModelManager } from '../../domain/model-manager/user.model-manager';
import { Injectable } from '@angular/core';

class UserNotFoundException extends Error {
  constructor(email: string) {
    super(`UserNotFoundException: user with email ${email} not found.`);
  }
}

export interface UpdateUserRequest1 {
  emailOfUserToUpdate: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserRequest2 {
  emailOfUserToUpdate: string;
  password: string;
}

export interface UpdateUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private userModelManager: UserModelManager
  ) {
  }

  public async exec1(request: UpdateUserRequest1): Promise<UpdateUserResponse> {
    const users = await this.userRepository.findByEmail(request.emailOfUserToUpdate);

    if (users.length === 0) {
      throw new UserNotFoundException(request.emailOfUserToUpdate);
    }

    const user = users[0];

    user.rename(request.firstName, request.lastName);

    const updated = await this.userModelManager.save(user);

    return {
      id: updated.getId(),
      email: updated.getEmail(),
      firstName: updated.getFirstName(),
      lastName: updated.getLastName(),
    };
  }


  public async exec2(request: UpdateUserRequest2): Promise<UpdateUserResponse> {
    const users = await this.userRepository.findByEmail(request.emailOfUserToUpdate);

    if (users.length === 0) {
      throw new UserNotFoundException(request.emailOfUserToUpdate);
    }

    const user = users[0];

    user.changePassword(request.password);

    const updated = await this.userModelManager.save(user);

    return {
      id: updated.getId(),
      email: updated.getEmail(),
      firstName: updated.getFirstName(),
      lastName: updated.getLastName(),
    };
  }
}
