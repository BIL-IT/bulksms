import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessMessageInput {
  @Field()
  message: string;
}
