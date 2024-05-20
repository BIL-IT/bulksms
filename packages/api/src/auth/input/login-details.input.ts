import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDetails {
  @Field()
  emailOrUsername: string;

  @Field()
  password: string;
}
