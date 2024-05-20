import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field(() => [String])
  phone: string[];

  @Field()
  content: string;
}
