import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class CurrentUserDetail {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  lastLoggedIn: string;

  @Field(() => Role)
  role: Role;
}
