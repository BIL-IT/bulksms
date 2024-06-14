import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupDetails {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  department: string;
}
