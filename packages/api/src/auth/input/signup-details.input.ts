import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum AllowedRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(AllowedRole, {
  name: 'AllowedRole',
});

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

  @Field(() => AllowedRole)
  role: AllowedRole;
}
