import { UserRepository } from '../../domain/repository/user.repository';
import { Injectable } from '@angular/core';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';

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
    private authService: CredentialsService,
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
