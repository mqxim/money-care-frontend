import { UserRepository } from '../../domain/repository/user.repository';
import { Injectable } from '@angular/core';

class UserNotFoundException extends Error {
  constructor(email: string) {
    super(`UserNotFoundException: user with email ${email} not found.`);
  }
}

class PasswordAreNotSameException extends Error {
  constructor() {
    super(`PasswordAreNotSameException: provided password are differ.`);
  }
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: UserRepository,
  ) {
  }

  public async exec(request: SignInRequest): Promise<SignInResponse> {
    const users = await this.userRepository.findByEmail(request.email);

    if (users.length === 0) {
      throw new UserNotFoundException(request.email);
    }

    const user = users[0];

    if (!user.comparePassword(request.password)) {
      throw new PasswordAreNotSameException();
    }

    return {
      id: user.id,
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName()
    };
  }
}
