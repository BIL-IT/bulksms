import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuccessMessage } from './output/success-message.model';
import { AuthService } from './auth.service';
import { LoginDetails } from './input/login-details.input';
import { SignupDetails } from './input/signup-details.input';
import { Response } from 'express';
import { CurrentUserDetail } from './output/current-user.model';
import { CurrentUser } from './curret-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ChangePasswordInput } from './input/change-password.input';
// import { z } from 'zod';

@Resolver()
export class AuthResolver {
  constructor(readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Query(() => CurrentUserDetail)
  async Me(
    @CurrentUser() { user }: { user: CurrentUserDetail },
  ): Promise<CurrentUserDetail> {
    // return {
    //   email: user.user.email,
    //   sub: user.user.sub,
    //   username: user.user.username,
    //   role: user.user.role,
    // };

    return user;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @CurrentUser() { user }: { user: CurrentUserDetail },
  ) {
    const updatedPassword = await this.authService.changePassword(
      changePasswordInput.oldPassword,
      changePasswordInput.newPassword,
      user.username,
    );

    return updatedPassword;
  }

  @Mutation(() => SuccessMessage)
  async Login(
    @Args('loginDetails') loginDetails: LoginDetails,
    @Context() { res }: { res: Response },
  ): Promise<SuccessMessage> {
    const token = await this.authService.Login(
      loginDetails.emailOrUsername,
      loginDetails.password,
    );

    res.cookie('auth', token, {
      httpOnly: true,
      maxAge: 3.6e6,
      sameSite: 'none',
      secure: true,
    });

    return { message: 'Success' };
  }

  @Mutation(() => SuccessMessage)
  async SignUp(
    @Args('signupDetails') signupDetails: SignupDetails,
  ): Promise<SuccessMessage> {
    const token = await this.authService.SignUp(
      signupDetails.email,
      signupDetails.username,
      signupDetails.password,
      signupDetails.department,
      signupDetails.role,
    );

    if (!token) throw new Error('Failed to create User');

    // res.cookie('auth', token, {
    //   httpOnly: true,
    //   maxAge: 3.6e6,
    //   sameSite: 'none',
    //   secure: true,
    // });

    return {
      message: 'Success',
    };
  }

  @Mutation(() => SuccessMessage)
  async Logout(@Context() { res }: { res: Response }): Promise<SuccessMessage> {
    try {
      res.clearCookie('auth');
      return { message: 'Success' };
    } catch {
      return {
        message: 'Failed',
      };
    }
  }

  @Mutation(() => String)
  async getToken(@Args('email') email: string) {
    const token = await this.authService.getTestToken(email);
    return token;
  }
}
