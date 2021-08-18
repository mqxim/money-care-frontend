import { Injectable } from '@angular/core';
import { User } from '../model';
import { CreateUserUseCase } from '../../../core/user/application/use-case/create-user.use-case';
import { SignInUseCase } from '../../../core/user/application/use-case/sign-in.use-case';
import { UpdateUserUseCase } from '../../../core/user/application/use-case/update-user.use-case';
import { CredentialsService } from '../../../core/shared/domain/service/credentials.service';

@Injectable({
  providedIn: 'root'
})
class AuthServices {
  constructor(
    private authService: CredentialsService,
    private signUpUseCase: CreateUserUseCase,
    private signInUseCase: SignInUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {
  }

  public async trySignIn(email: string, password: string): Promise<User | null> {
    const response = await this.signInUseCase.exec({ email, password });
    return new User(response.id, response.firstName, response.lastName);
  }

  public async trySignUp({ firstName, lastName, email, password }): Promise<User | null> {
    const response = await this.signUpUseCase.exec({
      firstName,
      lastName,
      email,
      password
    });

    return new User(response.id, response.firstName, response.lastName);
  }

  public async changePassword({ password }): Promise<User> {
    const user = this.authService.extractCredentials();

    const response = await this.updateUserUseCase.exec2({
      emailOfUserToUpdate: user.email,
      password
    });

    return new User(response.id, response.firstName, response.lastName);
  }

  public async changeUserInfo({ firstName, lastName }): Promise<User> {
    const user = this.authService.extractCredentials();

    const response = await this.updateUserUseCase.exec1({
      emailOfUserToUpdate: user.email,
      firstName,
      lastName
    });

    return new User(response.id, response.firstName, response.lastName);
  }

  public logout(): void {
    this.authService.logout();
  }
}

export {
  AuthServices
};
